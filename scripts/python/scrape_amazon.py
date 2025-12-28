"""
Amazon Deep Scraper (Multi-Page)
Features:
- Scrapes multiple categories
- Paginates through search results (Page 1-20+)
- Extracts Price, MRP, Title, Image, Rating
- Auto-saves progress to JSON
"""

import undetected_chromedriver as uc
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import json
import time
import random
import os
import re
import sys

# Output directory
from pathlib import Path
BASE_DIR = Path(__file__).resolve().parent.parent.parent
DUMP_DIR = os.path.join(BASE_DIR, "dump")
os.makedirs(DUMP_DIR, exist_ok=True)
RAW_OUTPUT_FILE = os.path.join(DUMP_DIR, "amazon_large_dump.json")
PROGRESS_FILE = os.path.join(DUMP_DIR, "scrape_progress.json")

# Categories to scrape
CATEGORIES = [
    {"name": "Necklaces", "slug": "necklaces", "url": "https://www.amazon.in/s?k=necklace+for+women&i=jewelry"},
    {"name": "Earrings", "slug": "earrings", "url": "https://www.amazon.in/s?k=earrings+for+women&i=jewelry"},
    {"name": "Bangles", "slug": "bangles", "url": "https://www.amazon.in/s?k=bangles+for+women&i=jewelry"},
    {"name": "Rings", "slug": "rings", "url": "https://www.amazon.in/s?k=rings+for+women&i=jewelry"},
    {"name": "Bracelets", "slug": "bracelets", "url": "https://www.amazon.in/s?k=bracelets+for+women&i=jewelry"},
    {"name": "Mangalsutra", "slug": "mangalsutra", "url": "https://www.amazon.in/s?k=mangalsutra&i=jewelry"},
    {"name": "Anklets", "slug": "anklets", "url": "https://www.amazon.in/s?k=anklets+for+women+silver&i=jewelry"}
]

PAGES_TO_SCRAPE = 2 # Test run limit (Set to 400 for full run)

def slugify(text: str) -> str:
    text = text.lower().strip()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[\s_-]+', '-', text)
    return text[:60]

def save_progress(products, progress_dict):
    """Save current products and page progress safely"""
    # Save products
    temp_file = RAW_OUTPUT_FILE + ".tmp"
    with open(temp_file, "w", encoding="utf-8") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    os.replace(temp_file, RAW_OUTPUT_FILE)
    
    # Save progress state
    with open(PROGRESS_FILE, "w", encoding="utf-8") as f:
        json.dump(progress_dict, f, indent=2)
        
    print(f"   💾 Saved {len(products)} products. Progress: {progress_dict}")

def main():
    print("🚀 Starting Deep Amazon Scraper (Resumable)...")
    
    # 1. Load Products
    all_products = []
    if os.path.exists(RAW_OUTPUT_FILE):
        try:
            with open(RAW_OUTPUT_FILE, "r") as f:
                all_products = json.load(f)
            print(f"   🔄 Loaded {len(all_products)} existing products.")
        except:
            pass

    existing_slugs = {p["slug"] for p in all_products}
    
    # 2. Load Progress
    progress = {}
    if os.path.exists(PROGRESS_FILE):
        try:
            with open(PROGRESS_FILE, "r") as f:
                progress = json.load(f)
            print(f"   🔄 Loaded progress: {progress}")
        except:
            pass

    # Start Browser
    print("🌐 Launching Stealth Browser...")
    options = uc.ChromeOptions()
    options.add_argument("--headless=new") # Run headless for background
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--window-size=1920,1080")
    
    driver = uc.Chrome(options=options)
    
    try:
        for cat in CATEGORIES:
            cat_name = cat["name"]
            start_page = progress.get(cat_name, 0) + 1
            
            if start_page > PAGES_TO_SCRAPE:
                print(f"\n📦 Check {cat_name}: Already finished (Last page: {start_page-1}). Skipping.")
                continue

            print(f"\n📦 Starting Category: {cat_name} (From Page {start_page})")
            
            base_url = cat["url"]
            driver.get(base_url)
            time.sleep(3)
            
            for page in range(start_page, PAGES_TO_SCRAPE + 1):
                print(f"\n   📄 Scraping Page {page}/{PAGES_TO_SCRAPE} for {cat_name}...")
                
                # Verify URL has page param or navigate via click? Both work.
                # Direct URL structure for Amazon pagination: &page=2
                page_url = f"{base_url}&page={page}"
                driver.get(page_url)
                time.sleep(random.uniform(2.0, 3.5)) # 2-3.5s delay
                
                # Check for products
                try:
                    WebDriverWait(driver, 10).until(
                        EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-component-type='s-search-result']"))
                    )
                except:
                    print(f"      ❌ Timeout waiting for items on page {page}. Retrying once...")
                    driver.refresh()
                    time.sleep(5)
                    try:
                        WebDriverWait(driver, 10).until(
                            EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-component-type='s-search-result']"))
                        )
                    except:
                        print("      🛑 Still failing. Moving to next category.")
                        break

                # Scroll down
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
                time.sleep(1)
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                
                # Parse
                soup = BeautifulSoup(driver.page_source, "html.parser")
                items = soup.select("div[data-component-type='s-search-result']")
                print(f"      Found {len(items)} items on page.")
                
                start_count = len(all_products)
                
                for item in items:
                    try:
                        # 1. Title
                        title_el = item.select_one("h2 a span")
                        link_el = item.select_one("h2 a")
                        
                        if not title_el: continue
                        title = title_el.text.strip()
                        slug = slugify(title)
                        
                        # Get URL
                        product_url = ""
                        if link_el and link_el.get("href"):
                            href = link_el.get("href")
                            if href.startswith("/"):
                                product_url = "https://www.amazon.in" + href
                            else:
                                product_url = href
                        
                        if slug in existing_slugs:
                            continue # Skip duplicates

                            
                        # 2. Price
                        price_el = item.select_one(".a-price-whole")
                        if not price_el: continue # Skip if no price (unavailable)
                        price = float(price_el.text.replace(",", "").replace(".", ""))
                        
                        # 3. Original Price (MRP)
                        mrp_el = item.select_one(".a-text-price .a-offscreen")
                        original_price = None
                        if mrp_el:
                            txt = mrp_el.text.replace("₹", "").replace(",", "").strip()
                            if txt: original_price = float(txt)
                            
                        # 4. Image
                        img_el = item.select_one("img.s-image")
                        image = img_el.get("src") if img_el else ""
                        
                        # 5. Rating
                        rating = 4.0
                        rating_el = item.select_one("span.a-icon-alt")
                        if rating_el:
                            match = re.search(r"([\d.]+)", rating_el.text)
                            if match: rating = float(match.group(1))

                        # 6. Reviews
                        reviews = 0
                        reviews_el = item.select_one("span.a-size-base.s-underline-text")
                        if reviews_el:
                            reviews = int(reviews_el.text.replace(",", "").replace("(", "").replace(")", ""))

                        # Calculate Logic
                        discount = 0
                        if original_price and original_price > price:
                            discount = int(((original_price - price) / original_price) * 100)
                        
                        # Add to list
                        product = {
                            "title": title,
                            "slug": slug,
                            "description": f"Elegant {cat['name']} from Amazon collection. High quality craftsmanship.",
                            "price": price,
                            "originalPrice": original_price,
                            "discountPercentage": discount,
                            "rating": rating,
                            "reviewsCount": reviews,
                            "itemsLeft": random.randint(10, 50),
                            "image": image,
                            "images": [image],
                            "category": cat["name"],
                            "categorySlug": cat["slug"],
                            "tags": [cat["slug"], "amazon", "jewelry"],
                            "isFeatured": False,
                            "isNew": page == 1, # Mark page 1 items as new
                            "source": "Amazon.in",
                            "sourceUrl": product_url
                        }
                        
                        all_products.append(product)
                        existing_slugs.add(slug)
                        print(f"      ✓ {title[:40]}... ₹{int(price)}")
                        
                    except Exception as e:
                        # print(f"Error parsing item: {e}")
                        continue
                
                added = len(all_products) - start_count
                print(f"      ✨ Added {added} new products from this page")
                
                # Update progress
                progress[cat_name] = page
                
                # Save periodically
                save_progress(all_products, progress)
                
                # Go to next page logic is handled by loop + direct URL get now
                # Just nice delay
                # time.sleep(random.uniform(3, 6)) # Already at start of loop

    except KeyboardInterrupt:
        print("\n� Stopping scraper (User Interrupt)")
    except Exception as e:
        print(f"\n❌ Fatal Error: {e}")
    finally:
        driver.quit()
        print("\n✅ Scraper Finished.")
        print(f"� Final Count: {len(all_products)} products saved to amazon_large_dump.json")

if __name__ == "__main__":
    main()
