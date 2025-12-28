"""
Import AdoreByPriyanka scraped data into Supabase PostgreSQL database

Usage:
    source ../.venv/bin/activate.fish
    python import_adore_to_db.py
"""

import psycopg2
from dotenv import load_dotenv
import json
import os
import uuid

# Load environment variables from parent .env.local
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

DUMP_DIR = os.path.join(BASE_DIR, "dump")

def main():
    # Get DATABASE_URL
    database_url = os.getenv("DATABASE_URL")
    
    if not database_url:
        print("❌ DATABASE_URL not found in .env.local")
        return
    
    # Strip query params that psycopg2 doesn't understand
    if "?" in database_url:
        database_url = database_url.split("?")[0]
    
    print("🔌 Connecting to database...")
    
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        print("✅ Connection successful!")
        
        # Load scraped data
        with open(os.path.join(DUMP_DIR, "adore_categories.json"), "r", encoding="utf-8") as f:
            raw_categories = json.load(f)
        
        with open(os.path.join(DUMP_DIR, "adore_products.json"), "r", encoding="utf-8") as f:
            products = json.load(f)
        
        # Fix category names (the API returned product_type not actual categories)
        # Map to proper jewelry categories
        category_mapping = {
            "variable": "Jewelry Sets",
            "simple": "Fashion Jewelry",
            "body-jewelry": "Body Jewelry",
            "jewelry": "Accessories",
        }
        
        categories = [
            {"name": "Necklaces", "slug": "necklaces", "description": "Beautiful necklaces and pendants"},
            {"name": "Earrings", "slug": "earrings", "description": "Elegant earrings collection"},
            {"name": "Bracelets", "slug": "bracelets", "description": "Stylish bracelets and bangles"},
            {"name": "Rings", "slug": "rings", "description": "Statement rings collection"},
            {"name": "Pendants", "slug": "pendants", "description": "Designer pendants"},
            {"name": "Anklets", "slug": "anklets", "description": "Traditional anklets"},
        ]
        
        print(f"📦 Loaded {len(categories)} categories, {len(products)} products")
        
        # Clear existing data
        print("\n🗑️  Clearing existing data...")
        cursor.execute('DELETE FROM "Product"')
        cursor.execute('DELETE FROM "Category"')
        connection.commit()
        
        # Insert categories
        print("\n📁 Creating categories...")
        category_id_map = {}
        
        for cat in categories:
            cat_id = str(uuid.uuid4())
            cursor.execute(
                '''INSERT INTO "Category" (id, name, slug, description, image, "createdAt", "updatedAt")
                   VALUES (%s, %s, %s, %s, %s, NOW(), NOW())''',
                (cat_id, cat["name"], cat["slug"], cat.get("description"), None)
            )
            category_id_map[cat["slug"]] = cat_id
            print(f"   ✓ {cat['name']}")
        
        connection.commit()
        
        # Map products to proper categories based on title keywords
        def get_category_for_product(title: str) -> str:
            title_lower = title.lower()
            if any(x in title_lower for x in ["necklace", "chain", "pendant set", "mangalsutra"]):
                return "necklaces"
            elif any(x in title_lower for x in ["earring", "jhumka", "studs", "tops"]):
                return "earrings"
            elif any(x in title_lower for x in ["bracelet", "bangle", "kada"]):
                return "bracelets"
            elif any(x in title_lower for x in ["ring"]):
                return "rings"
            elif any(x in title_lower for x in ["pendant"]):
                return "pendants"
            elif any(x in title_lower for x in ["anklet", "payal"]):
                return "anklets"
            else:
                return "earrings"  # Default category
        
        # Insert products
        print("\n📦 Creating products...")
        count = 0
        skipped = 0
        
        for p in products:
            # Determine category from product title
            cat_slug = get_category_for_product(p["title"])
            category_id = category_id_map.get(cat_slug, category_id_map["earrings"])
            
            product_id = str(uuid.uuid4())
            
            # Clean up tags
            tags = p.get("tags", [])
            if isinstance(tags, list):
                tags = [str(t) for t in tags[:5]]
            else:
                tags = [cat_slug, "jewelry"]
            
            # Get images
            images = p.get("images", [p["image"]])
            if not images:
                images = [p["image"]]
            
            try:
                cursor.execute(
                    '''INSERT INTO "Product" (
                        id, title, slug, description, price, "originalPrice", 
                        "discountPercentage", rating, "reviewsCount", "itemsLeft",
                        image, images, tags, "isFeatured", "isNew", "categoryId",
                        "createdAt", "updatedAt"
                    ) VALUES (
                        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW()
                    )''',
                    (
                        product_id,
                        p["title"][:100],
                        p["slug"][:60],
                        p.get("description", "")[:500],
                        p["price"],
                        p.get("originalPrice"),
                        p.get("discountPercentage"),
                        p.get("rating", 4.5),
                        p.get("reviewsCount", 25),
                        p.get("itemsLeft", 30),
                        p["image"],
                        images[:4],
                        tags,
                        p.get("isFeatured", False),
                        p.get("isNew", False),
                        category_id
                    )
                )
                count += 1
                
                if count % 100 == 0:
                    connection.commit()
                    print(f"   ✓ {count} products imported...")
                    
            except Exception as e:
                skipped += 1
                if skipped <= 5:
                    print(f"   ⚠ Error: {str(e)[:50]}")
                continue
        
        connection.commit()
        
        print(f"\n✅ Import completed!")
        print(f"   📁 {len(category_id_map)} categories")
        print(f"   📦 {count} products imported")
        if skipped:
            print(f"   ⚠ {skipped} products skipped due to errors")
        
        cursor.close()
        connection.close()
        print("\n🔒 Connection closed.")
        
    except Exception as e:
        print(f"❌ Failed: {e}")
        raise


if __name__ == "__main__":
    main()
