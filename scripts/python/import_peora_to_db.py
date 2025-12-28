"""
Import Peora Jewellery data INTO EXISTING database (APPEND mode - no delete)
Handles slug collisions intelligently - compares products before skipping

Usage:
    source ../.venv/bin/activate.fish
    python import_peora_to_db.py
"""

import psycopg2
from dotenv import load_dotenv
import json
import os
import uuid
import hashlib

# Load environment variables from parent .env.local
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

DUMP_DIR = os.path.join(BASE_DIR, "dump")

def make_unique_slug(slug: str, existing_slugs: set) -> str:
    """Generate a unique slug by appending a short hash"""
    counter = 1
    new_slug = slug
    while new_slug in existing_slugs:
        new_slug = f"{slug[:50]}-{counter}"
        counter += 1
    return new_slug

def main():
    # Try getting DIRECT_URL first (better for bulk imports)
    database_url = os.getenv("DIRECT_URL")
    
    # Fallback to DATABASE_URL
    if not database_url:
        print("ℹ️ DIRECT_URL not found, using DATABASE_URL...")
        database_url = os.getenv("DATABASE_URL")
    else:
        print("ℹ️ Using DIRECT_URL (Port 5432) for better stability...")
    
    if not database_url:
        print("❌ Database URL not found in .env.local")
        return
    
    # Force use of port 5432 (Session mode/Direct) instead of 6543 (Transaction pooler)
    # This fixes "prepared statement" errors and hangs during bulk inserts
    if ":6543" in database_url:
        print("⚠️ Detected Transaction Pooler (Port 6543). Switching to Direct Connection (Port 5432)...")
        database_url = database_url.replace(":6543", ":5432")
    
    # Strip query params that psycopg2 doesn't understand (like ?pgbouncer=true)
    if "?" in database_url:
        database_url = database_url.split("?")[0]
    
    print("🔌 Connecting to database...")
    
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        print("✅ Connection successful!")
        
        # Load scraped data
        with open(os.path.join(DUMP_DIR, "peora_products.json"), "r", encoding="utf-8") as f:
            products = json.load(f)
        
        print(f"📦 Loaded {len(products)} products from Peora")
        
        # Map Peora categories to our standard categories
        category_mapping = {
            "jewellery-sets": "necklaces",
            "earrings": "earrings",
            "bangles-bracelets": "bracelets",
            "handbags": "bracelets",
            "chain-pendant": "pendants",
            "rings": "rings",
            "jewelry": "necklaces",
            "bridal-jewellery": "necklaces",
            "mangalsutra": "necklaces",
            "bracelet": "bracelets",
            "belly-chain": "anklets",
            "hair-accessories": "necklaces",
            "toe-rings": "rings",
            "pendant-set": "pendants",
            "apparel-accessories": "necklaces",
            "necklace": "necklaces",
            "anklet": "anklets",
        }
        
        # Get existing categories from DB
        cursor.execute('SELECT slug, id FROM "Category"')
        existing_categories = {row[0]: row[1] for row in cursor.fetchall()}
        print(f"📁 Found {len(existing_categories)} existing categories in DB")
        
        # If no categories exist, create them
        if not existing_categories:
            print("\n📁 No categories found - creating them...")
            categories = [
                {"name": "Necklaces", "slug": "necklaces"},
                {"name": "Earrings", "slug": "earrings"},
                {"name": "Bracelets", "slug": "bracelets"},
                {"name": "Rings", "slug": "rings"},
                {"name": "Pendants", "slug": "pendants"},
                {"name": "Anklets", "slug": "anklets"},
            ]
            for cat in categories:
                cat_id = str(uuid.uuid4())
                cursor.execute(
                    '''INSERT INTO "Category" (id, name, slug, description, image, "createdAt", "updatedAt")
                       VALUES (%s, %s, %s, %s, %s, NOW(), NOW())''',
                    (cat_id, cat["name"], cat["slug"], None, None)
                )
                existing_categories[cat["slug"]] = cat_id
            connection.commit()
        
        # Get existing products (slug, title, price) to compare
        cursor.execute('SELECT slug, title, price FROM "Product"')
        existing_products = {row[0]: {"title": row[1], "price": float(row[2])} for row in cursor.fetchall()}
        existing_slugs = set(existing_products.keys())
        print(f"📦 Found {len(existing_slugs)} existing products in DB")
        
        # Track duplicates for analysis
        potential_duplicates = []
        true_duplicates = 0
        slug_collisions = 0
        
        # Prepare batch data
        batch_data = []
        BATCH_SIZE = 500 # Larger batch for speed
        
        # 1. Filter out what's already there first (Pre-process)
        print("\n🔍 Checking for new products...")
        new_products = []
        for p in products:
            slug = p["slug"][:60]
            
            if slug in existing_slugs:
                existing = existing_products.get(slug)
                if existing:
                    # Same name and roughly same price = true duplicate
                    if p["title"][:50].lower() == existing["title"][:50].lower() and abs(p["price"] - existing["price"]) < 10:
                        true_duplicates += 1
                        continue
                    else:
                        # Different product, same slug = resolve collision
                        slug_collisions += 1
                        slug = make_unique_slug(slug, existing_slugs)
            
            # If we reach here, it's a new product or a resolved collision
            p["final_slug"] = slug # Store it
            new_products.append(p)
            existing_slugs.add(slug)

        print(f"   ⏭️  Skipped {true_duplicates} products already in DB")
        print(f"   ✨ Found {len(new_products)} new products to import")

        if not new_products:
            print("\n✅ Nothing new to import!")
            return

        # 2. Bulk Insert using execute_values (Fastest way)
        from psycopg2.extras import execute_values
        
        print(f"\n🚀 Sending {len(new_products)} products to DB...")
        
        insert_query = '''INSERT INTO "Product" (
            id, title, slug, description, price, "originalPrice", 
            "discountPercentage", rating, "reviewsCount", "itemsLeft",
            image, images, tags, "isFeatured", "isNew", "categoryId",
            "createdAt", "updatedAt"
        ) VALUES %s ON CONFLICT (slug) DO NOTHING'''

        # Format everything into a list of tuples for the query
        values = []
        for p in new_products:
            cat_slug = category_mapping.get(p.get("categorySlug", ""), "necklaces")
            category_id = existing_categories.get(cat_slug) or existing_categories.get("necklaces")
            
            images = p.get("images", [p.get("image", "")])
            if not images or not images[0]: images = [p.get("image", "")]
            
            tags = p.get("tags", [])
            if not isinstance(tags, list): tags = [cat_slug, "jewelry"]

            values.append((
                str(uuid.uuid4()),
                p["title"][:100],
                p["final_slug"],
                p.get("description", "")[:500],
                float(p["price"]),
                float(p.get("originalPrice")) if p.get("originalPrice") else None,
                float(p.get("discountPercentage")) if p.get("discountPercentage") else None,
                float(p.get("rating", 4.5)),
                int(p.get("reviewsCount", 25)),
                int(p.get("itemsLeft", 30)),
                p.get("image", ""),
                images[:4],
                tags[:5],
                bool(p.get("isFeatured", False)),
                bool(p.get("isNew", False)),
                category_id
            ))

        # This part handles the NOW() automatically if we don't pass them
        template = "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())"
        
        try:
            execute_values(cursor, insert_query, values, template=template, page_size=500)
            connection.commit()
            print(f"   ✅ Successfully imported {len(values)} products!")
        except Exception as e:
            print(f"   ❌ Bulk insert failed: {e}")
            connection.rollback()

        # Get final count
        cursor.execute('SELECT COUNT(*) FROM "Product"')
        final_total = cursor.fetchone()[0]
        print(f"\n📊 Total products in DB now: {final_total}")
        
        cursor.close()
        connection.close()
        print("🔒 Connection closed.")
        
    except Exception as e:
        print(f"❌ Failed: {e}")
        raise


if __name__ == "__main__":
    main()
