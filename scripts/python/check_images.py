
import psycopg2
# Load environment variables
import os
from dotenv import load_dotenv
from pathlib import Path
dotenv_path = Path(__file__).parent.parent.parent / ".env.local"
load_dotenv(dotenv_path)

def main():
    database_url = os.getenv("DIRECT_URL") or os.getenv("DATABASE_URL")
    if not database_url:
        print("❌ Database URL not found")
        return
        
    try:
        connection = psycopg2.connect(database_url)
        cursor = connection.cursor()
        
        # Check products with null source
        cursor.execute('SELECT id, image, title FROM "Product" WHERE source IS NULL OR source = \'\' LIMIT 5')
        rows = cursor.fetchall()
        
        print("--- Sample Products with missing source ---")
        for row in rows:
            print(f"ID: {row[0]}")
            print(f"Image: {row[1]}")
            print(f"Title: {row[2]}")
            print("---")
            
        cursor.close()
        connection.close()

    except Exception as e:
        print(f"❌ Failed: {e}")

if __name__ == "__main__":
    main()
