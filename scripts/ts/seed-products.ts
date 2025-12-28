import { Pool } from "pg";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

// Categories from Meesho jewelry
const categories = [
  { name: "Mangalsutras", slug: "mangalsutras", description: "Traditional gold and diamond mangalsutras" },
  { name: "Necklaces & Chains", slug: "necklaces", description: "Gold chains and designer necklaces" },
  { name: "Anklets & Toe Rings", slug: "anklets", description: "Beautiful anklets and toe rings" },
  { name: "Earrings", slug: "earrings", description: "Studs, hoops, and chandbali earrings" },
  { name: "Bangles & Bracelets", slug: "bangles", description: "Traditional bangles and modern bracelets" },
  { name: "Rings", slug: "rings", description: "Designer rings for every occasion" },
];

// Sample products based on Meesho data
const products = [
  {
    title: "Beautiful Gold Plated American Diamond Mangalsutra",
    slug: "gold-plated-diamond-mangalsutra",
    description: "Elegant gold plated mangalsutra with American diamond stones. Perfect for daily wear and special occasions.",
    price: 94,
    originalPrice: 149,
    image: "https://images.meesho.com/images/products/15293867/f67ec_512.jpg",
    categorySlug: "mangalsutras",
    rating: 4.0,
    reviewsCount: 8134,
    itemsLeft: 45,
    isFeatured: true,
    isNew: false,
  },
  {
    title: "Classic Gold Chain for Women",
    slug: "classic-gold-chain-women",
    description: "Premium quality gold plated chain. Lightweight and comfortable for daily wear.",
    price: 153,
    originalPrice: 299,
    image: "https://images.meesho.com/images/products/8321101/8v5o6_512.jpg",
    categorySlug: "necklaces",
    rating: 3.8,
    reviewsCount: 13418,
    itemsLeft: 120,
    isFeatured: true,
    isNew: false,
  },
  {
    title: "Charming Women Anklets & Toe Ring Set",
    slug: "charming-anklets-toe-ring-set",
    description: "Beautiful silver plated anklet set with matching toe rings. Traditional design with modern finish.",
    price: 106,
    originalPrice: 199,
    image: "https://images.meesho.com/images/products/4724918/1_512.jpg",
    categorySlug: "anklets",
    rating: 3.9,
    reviewsCount: 1960,
    itemsLeft: 78,
    isFeatured: false,
    isNew: true,
  },
  {
    title: "Glittering Mangalsutra Gold Plated",
    slug: "glittering-mangalsutra-gold",
    description: "Stunning mangalsutra with intricate design. Made with high quality materials for long lasting shine.",
    price: 121,
    originalPrice: 249,
    image: "https://images.meesho.com/images/products/67611182/2yijm_512.jpg",
    categorySlug: "mangalsutras",
    rating: 4.1,
    reviewsCount: 9665,
    itemsLeft: 56,
    isFeatured: true,
    isNew: true,
  },
  {
    title: "Combo Mangalsutra Set - Buy 1 Get 1 Free",
    slug: "combo-mangalsutra-set-2pc",
    description: "Amazing value combo pack with 2 beautiful mangalsutras. Perfect gift for loved ones.",
    price: 166,
    originalPrice: 399,
    image: "https://images.meesho.com/images/products/249059867/v92vt_512.jpg",
    categorySlug: "mangalsutras",
    rating: 4.1,
    reviewsCount: 10864,
    itemsLeft: 34,
    isFeatured: false,
    isNew: true,
  },
  {
    title: "Graceful Women Anklets Silver Plated",
    slug: "graceful-anklets-silver",
    description: "Elegant silver plated anklets with bell design. Creates beautiful sound when walking.",
    price: 138,
    originalPrice: 249,
    image: "https://images.meesho.com/images/products/15467696/0d2a0_512.jpg",
    categorySlug: "anklets",
    rating: 4.2,
    reviewsCount: 20089,
    itemsLeft: 92,
    isFeatured: true,
    isNew: false,
  },
  {
    title: "Traditional Chandbali Earrings Gold",
    slug: "traditional-chandbali-earrings",
    description: "Beautiful chandbali style earrings with pearl drops. Perfect for weddings and festivals.",
    price: 189,
    originalPrice: 349,
    image: "https://images.meesho.com/images/products/4724918/1_512.jpg",
    categorySlug: "earrings",
    rating: 4.3,
    reviewsCount: 5420,
    itemsLeft: 67,
    isFeatured: true,
    isNew: true,
  },
  {
    title: "Designer Gold Plated Bangles Set",
    slug: "designer-gold-bangles-set",
    description: "Set of 4 beautiful gold plated bangles. Traditional design with modern touch.",
    price: 245,
    originalPrice: 499,
    image: "https://images.meesho.com/images/products/8321101/8v5o6_512.jpg",
    categorySlug: "bangles",
    rating: 4.0,
    reviewsCount: 7892,
    itemsLeft: 41,
    isFeatured: false,
    isNew: false,
  },
];

function generateId() {
  return `cuid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("❌ DATABASE_URL not set in .env.local");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  console.log("🌱 Starting seed process...\n");

  try {
    // 1. Insert Categories
    console.log("📁 Creating categories...");
    const categoryMap: Record<string, string> = {};

    for (const cat of categories) {
      // Check if exists
      const existing = await pool.query(
        'SELECT id FROM "Category" WHERE slug = $1',
        [cat.slug]
      );

      if (existing.rows.length > 0) {
        categoryMap[cat.slug] = existing.rows[0].id;
        console.log(`   ⚪ ${cat.name} (already exists)`);
      } else {
        const id = generateId();
        await pool.query(
          `INSERT INTO "Category" (id, name, slug, description, "createdAt", "updatedAt")
           VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [id, cat.name, cat.slug, cat.description]
        );
        categoryMap[cat.slug] = id;
        console.log(`   ✅ ${cat.name}`);
      }
    }

    // 2. Insert Products
    console.log("\n📦 Creating products...");

    for (const prod of products) {
      // Check if exists
      const existing = await pool.query(
        'SELECT id FROM "Product" WHERE slug = $1',
        [prod.slug]
      );

      if (existing.rows.length > 0) {
        console.log(`   ⚪ ${prod.title.substring(0, 40)}... (already exists)`);
      } else {
        const id = generateId();
        const categoryId = categoryMap[prod.categorySlug];
        const discountPercentage = Math.round(
          ((prod.originalPrice - prod.price) / prod.originalPrice) * 100
        );

        await pool.query(
          `INSERT INTO "Product" (
            id, slug, title, description, price, "originalPrice", "discountPercentage",
            rating, "reviewsCount", "itemsLeft", image, images, tags,
            "isFeatured", "isNew", "categoryId", "createdAt", "updatedAt"
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())`,
          [
            id,
            prod.slug,
            prod.title,
            prod.description,
            prod.price,
            prod.originalPrice,
            discountPercentage,
            prod.rating,
            prod.reviewsCount,
            prod.itemsLeft,
            prod.image,
            [prod.image], // images array
            ["jewelry", prod.categorySlug], // tags
            prod.isFeatured,
            prod.isNew,
            categoryId,
          ]
        );
        console.log(`   ✅ ${prod.title.substring(0, 40)}...`);
      }
    }

    console.log("\n✅ Seed completed successfully!");
    console.log(`   📁 ${categories.length} categories`);
    console.log(`   📦 ${products.length} products`);

  } catch (error) {
    console.error("❌ Error seeding data:", error);
  } finally {
    await pool.end();
  }
}

main();
