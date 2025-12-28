/**
 * Prisma Database Connection Tests
 * Tests the entire database setup including connection, schema, and basic CRUD operations
 */

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { header, pass, fail, info, summary, colors } from "../utils/runner";

// Create a test-specific Prisma client
function createTestPrismaClient() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);

  // Disable internal logging - we handle errors in test code
  return new PrismaClient({
    adapter,
    log: [],
  });
}

let prisma: PrismaClient;

export async function runTests() {
  header("Prisma Database Connection Tests");

  let passed = 0;
  let failed = 0;

  // Initialize Prisma client
  try {
    prisma = createTestPrismaClient();
    pass("Prisma client initialized successfully");
    passed++;
  } catch (error) {
    fail("Failed to initialize Prisma client", error);
    failed++;
    summary(passed, failed);
    return { passed, failed };
  }

  // Test 1: Basic Connection Test
  {
    try {
      await prisma.$connect();
      pass("Database connection established");
      passed++;
    } catch (error) {
      fail("Failed to connect to database", error);
      failed++;
      summary(passed, failed);
      return { passed, failed };
    }
  }

  // Test 2: Raw Query Execution
  {
    try {
      const result = await prisma.$queryRaw`SELECT 1 as connected`;
      if (Array.isArray(result) && result.length > 0) {
        pass("Raw SQL query execution works");
        passed++;
      } else {
        fail("Raw SQL query returned unexpected result");
        failed++;
      }
    } catch (error) {
      fail("Failed to execute raw SQL query", error);
      failed++;
    }
  }

  // Test 3: Check Database Version
  {
    try {
      const result = await prisma.$queryRaw<{ version: string }[]>`SELECT version()`;
      if (result && result[0]?.version) {
        info(`Database: ${result[0].version.split(" ").slice(0, 2).join(" ")}`);
        pass("Database version query works");
        passed++;
      } else {
        fail("Could not retrieve database version");
        failed++;
      }
    } catch (error) {
      fail("Failed to query database version", error);
      failed++;
    }
  }

  // Test 4: Verify User Table Exists
  {
    try {
      const count = await prisma.user.count();
      pass(`User table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("User table not accessible", error);
      failed++;
    }
  }

  // Test 5: Verify Product Table Exists
  {
    try {
      const count = await prisma.product.count();
      pass(`Product table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Product table not accessible", error);
      failed++;
    }
  }

  // Test 6: Verify Category Table Exists
  {
    try {
      const count = await prisma.category.count();
      pass(`Category table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Category table not accessible", error);
      failed++;
    }
  }

  // Test 7: Verify Cart Table Exists
  {
    try {
      const count = await prisma.cart.count();
      pass(`Cart table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Cart table not accessible", error);
      failed++;
    }
  }

  // Test 8: Verify Wishlist Table Exists
  {
    try {
      const count = await prisma.wishlist.count();
      pass(`Wishlist table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Wishlist table not accessible", error);
      failed++;
    }
  }

  // Test 9: Verify Order Table Exists
  {
    try {
      const count = await prisma.order.count();
      pass(`Order table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Order table not accessible", error);
      failed++;
    }
  }

  // Test 10: Verify Address Table Exists
  {
    try {
      const count = await prisma.address.count();
      pass(`Address table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Address table not accessible", error);
      failed++;
    }
  }

  // Test 11: Verify Review Table Exists
  {
    try {
      const count = await prisma.review.count();
      pass(`Review table accessible (${count} records)`);
      passed++;
    } catch (error) {
      fail("Review table not accessible", error);
      failed++;
    }
  }

  // Test 12: Test Relations - Product with Category
  {
    try {
      const product = await prisma.product.findFirst({
        include: { category: true },
      });
      if (product) {
        pass("Product-Category relation works");
        info(`Sample: "${product.title}" in category "${product.category?.name || 'none'}"`);
      } else {
        info("No products found (empty database)");
        pass("Product-Category relation query works (no data)");
      }
      passed++;
    } catch (error) {
      fail("Product-Category relation failed", error);
      failed++;
    }
  }

  // Test 13: Test Create/Delete Transaction (Rollback)
  {
    const testSlug = `__test_product_${Date.now()}__`;
    try {
      // Create test product
      const created = await prisma.product.create({
        data: {
          slug: testSlug,
          title: "Test Product - Should Be Deleted",
          price: 0.01,
          image: "https://test.com/image.jpg",
        },
      });

      // Delete it immediately
      await prisma.product.delete({
        where: { id: created.id },
      });

      // Verify deletion
      const found = await prisma.product.findUnique({
        where: { slug: testSlug },
      });

      if (!found) {
        pass("Create/Delete transaction works correctly");
        passed++;
      } else {
        fail("Delete operation did not work");
        failed++;
        // Cleanup
        await prisma.product.delete({ where: { slug: testSlug } });
      }
    } catch (error) {
      fail("Create/Delete transaction failed", error);
      failed++;
      // Cleanup attempt
      try {
        await prisma.product.delete({ where: { slug: testSlug } });
      } catch {
        // Ignore cleanup errors
      }
    }
  }

  // Test 14: Test Unique Constraint
  {
    const testSlug = `__unique_test_${Date.now()}__`;
    try {
      // Create first product
      await prisma.product.create({
        data: {
          slug: testSlug,
          title: "Unique Test Product 1",
          price: 0.01,
          image: "https://test.com/image.jpg",
        },
      });

      // Try to create duplicate
      let uniqueViolated = false;
      try {
        await prisma.product.create({
          data: {
            slug: testSlug,
            title: "Unique Test Product 2",
            price: 0.02,
            image: "https://test.com/image2.jpg",
          },
        });
      } catch {
        uniqueViolated = true;
      }

      // Cleanup
      await prisma.product.delete({ where: { slug: testSlug } });

      if (uniqueViolated) {
        pass("Unique constraint enforced correctly");
        passed++;
      } else {
        fail("Unique constraint not enforced");
        failed++;
      }
    } catch (error) {
      fail("Unique constraint test failed", error);
      failed++;
      // Cleanup attempt
      try {
        await prisma.product.delete({ where: { slug: testSlug } });
      } catch {
        // Ignore
      }
    }
  }

  // Test 15: Test Enum Values (Role)
  {
    try {
      const result = await prisma.$queryRaw<{ enumlabel: string }[]>`
        SELECT enumlabel::text FROM pg_enum 
        WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'Role')
        ORDER BY enumsortorder
      `;
      
      const roles = result.map((r) => r.enumlabel);
      const expectedRoles = ["USER", "ADMIN"];
      
      const hasAllRoles = expectedRoles.every((role) => roles.includes(role));
      
      if (hasAllRoles) {
        pass(`Role enum values correct: [${roles.join(", ")}]`);
        passed++;
      } else {
        fail(`Role enum missing values. Found: [${roles.join(", ")}], Expected: [${expectedRoles.join(", ")}]`);
        failed++;
      }
    } catch (error) {
      fail("Failed to verify Role enum", error);
      failed++;
    }
  }

  // Test 16: Test Enum Values (OrderStatus)
  {
    try {
      const result = await prisma.$queryRaw<{ enumlabel: string }[]>`
        SELECT enumlabel::text FROM pg_enum 
        WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'OrderStatus')
        ORDER BY enumsortorder
      `;

      const statuses = result.map((r) => r.enumlabel);
      const expectedStatuses = ["PENDING", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

      const hasAllStatuses = expectedStatuses.every((status) => statuses.includes(status));

      if (hasAllStatuses) {
        pass(`OrderStatus enum values correct: [${statuses.join(", ")}]`);
        passed++;
      } else {
        fail(`OrderStatus enum missing values. Found: [${statuses.join(", ")}]`);
        failed++;
      }
    } catch (error) {
      fail("Failed to verify OrderStatus enum", error);
      failed++;
    }
  }

  // Test 17: Connection Pool Health
  {
    try {
      // Run multiple queries in parallel to test connection pooling
      const queries = Array.from({ length: 5 }, () =>
        prisma.$queryRaw`SELECT 1`
      );

      await Promise.all(queries);
      pass("Connection pool handles concurrent queries");
      passed++;
    } catch (error) {
      fail("Connection pool failed under load", error);
      failed++;
    }
  }

  // Cleanup
  try {
    await prisma.$disconnect();
    info("Database connection closed cleanly");
  } catch (error) {
    console.log(`${colors.yellow}Warning: Error during disconnect: ${error}${colors.reset}`);
  }

  summary(passed, failed);
  return { passed, failed };
}

// Run if executed directly
runTests().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
