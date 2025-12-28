/**
 * Categories API Tests
 */

import { get } from "../utils/http";
import { header, assert, summary, info } from "../utils/runner";

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: unknown[];
  count?: number;
}

export async function runTests() {
  header("Categories API Tests");
  
  let passed = 0;
  let failed = 0;

  // Test 1: GET all categories
  {
    const res = await get<ApiResponse>("/api/categories");
    
    if (assert(res.status === 200 && res.data.success, "GET /api/categories")) {
      passed++;
      info(`Found ${res.data.count} categories`);
    } else {
      failed++;
    }
  }

  // Test 2: Categories returns array
  {
    const res = await get<ApiResponse>("/api/categories");
    
    if (assert(Array.isArray(res.data.data), "Categories data is an array")) {
      passed++;
    } else {
      failed++;
    }
  }

  summary(passed, failed);
  return { passed, failed };
}

// Run if executed directly
runTests().catch(console.error);
