"""
Verification script to cross-reference JSON dumps with the DB state.
Compares:
- adore_products.json
- peora_products.json
- amazon_in_products.json
"""

import psycopg2
from dotenv import load_dotenv
import json
import os

# Load environment variables
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
load_dotenv(os.path.join(BASE_DIR, ".env.local"))

DUMP_DIR = os.path.join(BASE_DIR, "dump")
JSON_FILES = [
    "adore_products.json",
    "peora_products.json",
    "amazon_in_products.json"
]

def main():
    database_url = os.getenv("DIRECT_URL") or os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ Database URL not found")
        return
    
    # Patch for direct connection
    if ":6543" in database_url:
        database_url = database_url.replace(":6543", ":5432")
    if "?" in database_url:
        database_url = database_url.split("?")[0]

    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        
        # 1. Get all slugs from DB
        print("🔄 Fetching all product slugs from DB...")
        cursor.execute('SELECT slug FROM "Product"')
        db_slugs = {row[0] for row in cursor.fetchall()}
        print(f"✅ DB contains {len(db_slugs)} products.\n")

        # 2. Check each JSON file
        total_missing = 0
        total_json_products = 0

        for filename in JSON_FILES:
            filepath = os.path.join(DUMP_DIR, filename)
            if not os.path.exists(filepath):
                print(f"⚠️  File not found: {filename}")
                continue

            with open(filepath, "r", encoding="utf-8") as f:
                products = json.load(f)
            
            total_json_products += len(products)
            missing = []
            found = 0
            collisions = 0

            for p in products:
                slug = p["slug"][:60]
                if slug in db_slugs:
                    found += 1
                else:
                    missing.append(slug)
            
            print(f"📊 Report for {filename}:")
            print(f"   - Products in JSON: {len(products)}")
            print(f"   - Match in DB: {found}")
            if missing:
                print(f"   - Missing/Collided: {len(missing)}")
                # We show first 3 missing to differentiate between collision and missing
                if len(missing) > 0:
                    print(f"     (Samples: {missing[:3]})")
            else:
                print(f"   - ✅ 100% coverage!")
            print("-" * 30)
            
            total_missing += len(missing)

        print(f"\n✨ FINAL SUMMARY:")
        print(f"   JSON Aggregate: {total_json_products} products")
        print(f"   DB Current Total: {len(db_slugs)} products")
        
        # Explain why DB might be less (true duplicates)
        if len(db_slugs) < total_json_products:
            diff = total_json_products - len(db_slugs)
            print(f"   💡 Note: {diff} products were likely skipped as True Duplicates (same name/price).")

        cursor.close()
        connection.close()
        
    except Exception as e:
        print(f"❌ Verification failed: {e}")

if __name__ == "__main__":
    main()
