/**
 * Auth API Tests
 */

import { post, get } from "../utils/http";
import { header, assert, uniqueEmail, summary } from "../utils/runner";

interface ApiResponse {
  success: boolean;
  error?: string;
  data?: unknown;
}

export async function runTests() {
  header("Auth API Tests");
  
  let passed = 0;
  let failed = 0;

  // Test 1: Register new user
  {
    const email = uniqueEmail();
    const res = await post<ApiResponse>("/api/auth/register", {
      firstName: "Test",
      lastName: "User",
      email,
      password: "TestPass123",
    });
    
    if (assert(res.status === 200 && res.data.success, "Register new user")) {
      passed++;
    } else {
      failed++;
    }
  }

  // Test 2: Register with duplicate email
  {
    const email = "admin@ristore.com"; // Admin already exists
    const res = await post<ApiResponse>("/api/auth/register", {
      firstName: "Duplicate",
      lastName: "User",
      email,
      password: "TestPass123",
    });
    
    if (assert(res.status === 400 && !res.data.success, "Reject duplicate email registration")) {
      passed++;
    } else {
      failed++;
    }
  }

  // Test 3: Register with missing fields
  {
    const res = await post<ApiResponse>("/api/auth/register", {
      email: "incomplete@test.com",
      // Missing firstName, lastName, password
    });
    
    if (assert(res.status === 400, "Reject incomplete registration")) {
      passed++;
    } else {
      failed++;
    }
  }

  // Test 4: Check session endpoint (no auth)
  {
    const res = await get<unknown>("/api/auth/session");
    // Should return something (even if null session)
    if (assert(res.status === 200, "Session endpoint accessible")) {
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
