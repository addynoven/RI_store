"""
Scraper for PeoraJewellery.com using Shopify JSON API

Usage:
    source .venv/bin/activate.fish
    python scrape_peora.py
"""

import requests
from fake_useragent import UserAgent
import json
import time
import random
import os
import re

# Output directory
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DUMP_DIR = os.path.join(BASE_DIR, "dump")
os.makedirs(DUMP_DIR, exist_ok=True)

ua = UserAgent()

def get_headers():
    return {
        "User-Agent": ua.random,
        "Accept": "application/json, text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.5",
    }

def slugify(text: str) -> str:
    """Convert text to URL-friendly slug"""
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text[:60]

def scrape_shopify_store(base_url: str, store_name: str):
    """Scrape products using Shopify's JSON API"""
    
    all_products = []
    categories = {}
    page = 1
    
    print(f"🌐 Scraping {store_name}...")
    
    while True:
        # Shopify exposes products.json 
        url = f"{base_url}/products.json?limit=250&page={page}"
        print(f"   Fetching page {page}...")
        
        try:
            response = requests.get(url, headers=get_headers(), timeout=30)
            
            if response.status_code != 200:
                print(f"   Status {response.status_code} - stopping")
                break
            
            data = response.json()
            products = data.get("products", [])
            
            if not products:
                print(f"   No more products")
                break
            
            print(f"   Found {len(products)} products")
            
            for p in products:
                try:
                    # Extract product data
                    title = p.get("title", "Product")
                    slug = p.get("handle", slugify(title))
                    
                    # Get category from product type or tags
                    product_type = p.get("product_type", "Jewelry")
                    if product_type:
                        cat_slug = slugify(product_type)
                        if cat_slug not in categories:
                            categories[cat_slug] = {
                                "name": product_type.title(),
                                "slug": cat_slug,
                                "description": f"Beautiful {product_type.lower()} collection"
                            }
                    else:
                        cat_slug = "jewelry"
                        if cat_slug not in categories:
                            categories[cat_slug] = {
                                "name": "Jewelry",
                                "slug": cat_slug,
                                "description": "Beautiful jewelry collection"
                            }
                    
                    # Get first variant price
                    variants = p.get("variants", [])
                    price = 999
                    original_price = None
                    if variants:
                        try:
                            price = int(float(variants[0].get("price", "999")))
                            compare_price = variants[0].get("compare_at_price")
                            if compare_price:
                                original_price = int(float(compare_price))
                        except:
                            pass
                    
                    # Calculate discount
                    discount = None
                    if original_price and original_price > price:
                        discount = round((1 - price / original_price) * 100)
                    
                    # Get first image
                    images = p.get("images", [])
                    image = images[0].get("src", "") if images else ""
                    all_images = [img.get("src", "") for img in images[:4]]
                    
                    if not image:
                        image = f"https://picsum.photos/seed/{slug}/400/400"
                        all_images = [image]
                    
                    # Description (strip HTML)
                    desc = p.get("body_html", "")
                    desc = re.sub(r'<[^>]+>', '', desc)  # Remove HTML tags
                    desc = desc[:300] if desc else f"Beautiful {product_type.lower()} from {store_name}."
                    
                    product_data = {
                        "title": title[:100],
                        "slug": slug,
                        "description": desc,
                        "price": price,
                        "originalPrice": original_price,
                        "discountPercentage": discount,
                        "rating": round(random.uniform(4.2, 4.9), 1),
                        "reviewsCount": random.randint(5, 120),
                        "itemsLeft": random.randint(10, 50),
                        "image": image,
                        "images": all_images,
                        "category": categories[cat_slug]["name"],
                        "categorySlug": cat_slug,
                        "tags": p.get("tags", [])[:5] if p.get("tags") else [cat_slug, "jewelry"],
                        "isFeatured": random.random() > 0.85,
                        "isNew": random.random() > 0.9,
                        "vendor": p.get("vendor", store_name),
                    }
                    
                    all_products.append(product_data)
                    
                except Exception as e:
                    print(f"   ⚠ Error parsing product: {e}")
                    continue
            
            page += 1
            time.sleep(random.uniform(1, 2))  # Rate limiting
            
            # Safety limit
            if page > 30:
                break
                
        except Exception as e:
            print(f"   ❌ Error: {e}")
            break
    
    return list(categories.values()), all_products


def main():
    print("🚀 Starting Peora Jewellery Scraper (Shopify API)...")
    print("=" * 50)
    
    base_url = "https://www.peorajewellery.com"
    
    categories, products = scrape_shopify_store(base_url, "Peora Jewelry")
    
    print(f"\n✅ Scraped {len(products)} products in {len(categories)} categories")
    
    # Show category breakdown
    print("\n📊 Categories:")
    cat_counts = {}
    for p in products:
        cat = p["categorySlug"]
        cat_counts[cat] = cat_counts.get(cat, 0) + 1
    for cat, count in sorted(cat_counts.items(), key=lambda x: -x[1]):
        print(f"   {cat}: {count}")
    
    # Save categories
    categories_file = os.path.join(DUMP_DIR, "peora_categories.json")
    with open(categories_file, "w", encoding="utf-8") as f:
        json.dump(categories, f, indent=2, ensure_ascii=False)
    print(f"\n📁 Saved categories to {categories_file}")
    
    # Save products
    products_file = os.path.join(DUMP_DIR, "peora_products.json")
    with open(products_file, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    print(f"📁 Saved products to {products_file}")
    
    print(f"\n🎉 Done!")


if __name__ == "__main__":
    main()
