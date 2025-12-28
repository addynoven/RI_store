
import { prisma } from '@/lib/prisma'

async function main() {
  const counts = await prisma.product.groupBy({
    by: ['source'],
    _count: {
      id: true
    }
  })

  console.log("--- Source Distribution ---")
  for (const c of counts) {
    console.log(`${c.source || "NULL/Empty"}: ${c._count.id}`)
  }

  const nullSource = await prisma.product.findMany({
    where: { source: null },
    take: 5
  })

  if (nullSource.length > 0) {
    console.log("\n--- Remaining NULL Sources ---")
    nullSource.forEach(p => console.log(p.id, p.title))
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
