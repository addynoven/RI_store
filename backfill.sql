
-- 1. Update Peora products (Shopify ID: 0598...)
UPDATE "Product"
SET "source" = 'Peora'
WHERE ("source" IS NULL OR "source" = '') 
  AND "image" LIKE '%/1/0598/4573/8659/%';

-- 2. Update Adore By Priyanka products (Shopify ID: 0560...)
UPDATE "Product"
SET "source" = 'Adore By Priyanka'
WHERE ("source" IS NULL OR "source" = '')
  AND "image" LIKE '%/1/0560/7889/3117/%';

-- 3. Update Amazon products
UPDATE "Product"
SET "source" = 'Amazon'
WHERE ("source" IS NULL OR "source" = '')
  AND ("image" LIKE '%amazon%' OR "image" LIKE '%m.media-amazon%');

-- Optional: Check remaining NULLs
SELECT count(*) FROM "Product" WHERE "source" IS NULL OR "source" = '';
