"""
Import Amazon.in data (fallback scraper data) INTO EXISTING database (APPEND mode)
Uses fast execute_values for bulk insert.

Usage:
    source ../.venv/bin/activate.fish
    python import_amazon_to_db.py
"""

import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv
import json
import os
import uuid

# Load environment variables
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

DUMP_DIR = os.path.join(BASE_DIR, "dump")
AMAZON_FILE = "amazon_in_products.json"

def main():
    database_url = os.getenv("DIRECT_URL") or os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ Database URL not found")
        return
    
    if ":6543" in database_url:
        database_url = database_url.replace(":6543", ":5432")
    if "?" in database_url:
        database_url = database_url.split("?")[0]

    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        print("✅ Connected to DB")
        
        # Load Amazon data
        filepath = os.path.join(DUMP_DIR, AMAZON_FILE)
        if not os.path.exists(filepath):
            print(f"❌ File not found: {filepath}")
            return
            
        with open(filepath, "r", encoding="utf-8") as f:
            products = json.load(f)
        
        print(f"📦 Loaded {len(products)} products from Amazon JSON")

        # Get existing categories just in case
        cursor.execute('SELECT slug, id FROM "Category"')
        existing_categories = {row[0]: row[1] for row in cursor.fetchall()}
        
        # Prepare batch
        values = []
        for p in products:
            # Generate UUID if not present
            p_id = p.get("id") or str(uuid.uuid4())
            
            # Map category
            cat_slug = p.get("category", "necklaces").lower()
            cat_id = existing_categories.get(cat_slug) or existing_categories.get("necklaces")
            
            # Ensure images is array
            images = p.get("images", [])
            if not images:
                images = [p.get("image", "")]
            
            # Create slug if missing
            slug = p.get("slug")
            if not slug:
                 slug = p["title"].lower().replace(" ", "-")[:50]

            values.append((
                p_id,
                p["title"][:100],
                slug,
                p.get("description", "")[:500],
                float(p["price"]),
                float(p.get("originalPrice")) if p.get("originalPrice") else None,
                float(p.get("discountPercentage")) if p.get("discountPercentage") else None,
                float(p.get("rating", 4.5)),
                int(p.get("reviewsCount", 10)),
                int(p.get("itemsLeft", 50)),
                p.get("image", ""),
                images[:4],
                ["amazon", "jewelry"],
                bool(p.get("isFeatured", False)),
                bool(p.get("isNew", False)),
                cat_id,
                p.get("source", "Amazon.in"),
                p.get("sourceUrl", "")
            ))

        print(f"🚀 Importing {len(values)} Amazon products...")
        query = '''
            INSERT INTO "Product" (
                id, title, slug, description, price, "originalPrice",
                "discountPercentage", rating, "reviewsCount", "itemsLeft",
                image, images, tags, "isFeatured", "isNew", "categoryId",
                "source", "sourceUrl",
                "createdAt", "updatedAt"
            ) VALUES %s
            ON CONFLICT (slug) DO NOTHING
        '''
        
        template = "(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())"
        
        execute_values(cursor, query, values, template=template)
        connection.commit()
        
        print(f"✅ Successfully imported Amazon products!")
        
        cursor.close()
        connection.close()

    except Exception as e:
        print(f"❌ Failed: {e}")

if __name__ == "__main__":
    main()
