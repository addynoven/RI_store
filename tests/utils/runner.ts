/**
 * Test Runner Utilities
 */

// Colors for terminal output
export const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
};

export function pass(message: string) {
  console.log(`${colors.green}✅ PASS${colors.reset}: ${message}`);
}

export function fail(message: string, error?: unknown) {
  console.log(`${colors.red}❌ FAIL${colors.reset}: ${message}`);
  if (error) {
    console.log(`   ${colors.yellow}→ ${error}${colors.reset}`);
  }
}

export function info(message: string) {
  console.log(`${colors.cyan}ℹ️  INFO${colors.reset}: ${message}`);
}

export function header(title: string) {
  console.log(`\n${colors.bold}${colors.blue}━━━ ${title} ━━━${colors.reset}\n`);
}

export function summary(passed: number, failed: number) {
  const total = passed + failed;
  const color = failed > 0 ? colors.red : colors.green;
  console.log(`\n${colors.bold}━━━ Summary ━━━${colors.reset}`);
  console.log(`${color}Passed: ${passed}/${total}${colors.reset}`);
  if (failed > 0) {
    console.log(`${colors.red}Failed: ${failed}${colors.reset}`);
  }
}

// Test assertion helper
export function assert(condition: boolean, message: string): boolean {
  if (condition) {
    pass(message);
    return true;
  } else {
    fail(message);
    return false;
  }
}

// Generate unique test data
export function uniqueEmail() {
  return `test_${Date.now()}_${Math.random().toString(36).slice(2)}@test.com`;
}
