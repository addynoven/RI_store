/**
 * Master Test Runner
 * Runs all test suites and reports overall results
 */

import { colors } from "./utils/runner";
import { runTests as runAuthTests } from "./api/auth.test";
import { runTests as runProductsTests } from "./api/products.test";
import { runTests as runCategoriesTests } from "./api/categories.test";

async function main() {
  console.log(`\n${colors.bold}${colors.cyan}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}║       RI Store API Test Suite         ║${colors.reset}`);
  console.log(`${colors.bold}${colors.cyan}╚═══════════════════════════════════════╝${colors.reset}\n`);

  const results = {
    totalPassed: 0,
    totalFailed: 0,
  };

  try {
    // Run Auth Tests
    const auth = await runAuthTests();
    results.totalPassed += auth.passed;
    results.totalFailed += auth.failed;

    // Run Products Tests
    const products = await runProductsTests();
    results.totalPassed += products.passed;
    results.totalFailed += products.failed;

    // Run Categories Tests
    const categories = await runCategoriesTests();
    results.totalPassed += categories.passed;
    results.totalFailed += categories.failed;

  } catch (error) {
    console.error(`\n${colors.red}Fatal error running tests:${colors.reset}`, error);
    process.exit(1);
  }

  // Final Summary
  console.log(`\n${colors.bold}╔═══════════════════════════════════════╗${colors.reset}`);
  console.log(`${colors.bold}║           FINAL RESULTS               ║${colors.reset}`);
  console.log(`${colors.bold}╚═══════════════════════════════════════╝${colors.reset}`);
  
  const total = results.totalPassed + results.totalFailed;
  const successRate = total > 0 ? ((results.totalPassed / total) * 100).toFixed(1) : 0;
  
  console.log(`\n  Total Tests: ${total}`);
  console.log(`  ${colors.green}Passed: ${results.totalPassed}${colors.reset}`);
  if (results.totalFailed > 0) {
    console.log(`  ${colors.red}Failed: ${results.totalFailed}${colors.reset}`);
  }
  console.log(`  Success Rate: ${successRate}%\n`);

  if (results.totalFailed > 0) {
    console.log(`${colors.red}${colors.bold}❌ Some tests failed!${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}${colors.bold}✅ All tests passed!${colors.reset}\n`);
    process.exit(0);
  }
}

main();
