
import { prisma } from '@/lib/prisma'

async function main() {
  const result = await prisma.product.deleteMany({
    where: {
      OR: [
        { source: null },
        { source: '' }
      ]
    }
  })

  console.log(`Deleted ${result.count} products with unknown source.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
