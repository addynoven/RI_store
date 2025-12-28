# Testing Infrastructure

Run tests against the local dev server.

## Prerequisites
- Dev server must be running: `pnpm dev`
- Admin user must exist: `npx tsx scripts/seed-admin.ts`

## Running Tests

```bash
# Run all tests
npx tsx tests/run-all.ts

# Run specific test file
npx tsx tests/api/auth.test.ts
npx tsx tests/api/products.test.ts
npx tsx tests/api/categories.test.ts
```

## Test Output
Tests print colored output:
- ✅ Green = Pass
- ❌ Red = Fail

## Adding New Tests
1. Create a new `.test.ts` file in `tests/api/`
2. Export a `runTests()` function
3. Import and call it in `tests/run-all.ts`
