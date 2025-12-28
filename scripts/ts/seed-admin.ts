import { Pool } from "pg";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: ".env.local" });

async function main() {
  const connectionString = process.env.DATABASE_URL;
  
  if (!connectionString) {
    console.error("❌ DATABASE_URL not set in .env.local");
    process.exit(1);
  }

  const pool = new Pool({ connectionString });

  const adminEmail = "admin@ristore.com";
  const adminPassword = "Admin@123"; // Change this!
  const adminName = "Admin";
  
  console.log("🔐 Creating admin user...");
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Password: ${adminPassword}`);
  
  try {
    // Check if admin already exists
    const existingResult = await pool.query(
      'SELECT id FROM "User" WHERE email = $1',
      [adminEmail]
    );

    if (existingResult.rows.length > 0) {
      console.log("⚠️  Admin user already exists. Updating role to ADMIN...");
      await pool.query(
        'UPDATE "User" SET role = $1 WHERE email = $2',
        ["ADMIN", adminEmail]
      );
    } else {
      // Hash password and create admin
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      const id = `cuid_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      await pool.query(
        `INSERT INTO "User" (id, name, email, password, role, "createdAt", "updatedAt") 
         VALUES ($1, $2, $3, $4, $5, NOW(), NOW())`,
        [id, adminName, adminEmail, hashedPassword, "ADMIN"]
      );
    }

    console.log("✅ Admin user created successfully!");
    console.log("\n📋 Login credentials:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log("\n⚠️  IMPORTANT: Change this password after first login!");
    
  } catch (error) {
    console.error("❌ Error creating admin:", error);
  } finally {
    await pool.end();
  }
}

main();
