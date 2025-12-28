"""
Import scraped jewelry data into Supabase PostgreSQL database
Uses psycopg2 with dotenv per Supabase docs

Usage:
    source ../.venv/bin/activate.fish
    python import_to_db.py
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
        with open(os.path.join(DUMP_DIR, "categories.json"), "r", encoding="utf-8") as f:
            categories = json.load(f)
        
        with open(os.path.join(DUMP_DIR, "products.json"), "r", encoding="utf-8") as f:
            products = json.load(f)
        
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
                (cat_id, cat["name"], cat["slug"], cat.get("description"), cat.get("image"))
            )
            category_id_map[cat["slug"]] = cat_id
            print(f"   ✓ {cat['name']}")
        
        connection.commit()
        
        # Insert products
        print("\n📦 Creating products...")
        count = 0
        
        for p in products:
            category_id = category_id_map.get(p.get("categorySlug"))
            if not category_id:
                print(f"   ⚠ Skipping {p['title'][:30]} - no category")
                continue
            
            product_id = str(uuid.uuid4())
            
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
                    p["title"],
                    p["slug"],
                    p.get("description"),
                    p["price"],
                    p.get("originalPrice"),
                    p.get("discountPercentage"),
                    p.get("rating", 4.0),
                    p.get("reviewsCount", 10),
                    p.get("itemsLeft", 50),
                    p["image"],
                    [p["image"]],  # PostgreSQL array
                    p.get("tags", []),  # PostgreSQL array
                    p.get("isFeatured", False),
                    p.get("isNew", False),
                    category_id
                )
            )
            count += 1
            
            if count % 10 == 0:
                print(f"   ✓ {count} products imported...")
        
        connection.commit()
        
        print(f"\n✅ Import completed!")
        print(f"   📁 {len(category_id_map)} categories")
        print(f"   📦 {count} products")
        
        cursor.close()
        connection.close()
        print("\n🔒 Connection closed.")
        
    except Exception as e:
        print(f"❌ Failed: {e}")
        raise


if __name__ == "__main__":
    main()
