
import { prisma } from '@/lib/prisma'

async function main() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { source: null },
        { source: '' }
      ]
    },
    take: 5,
    select: {
      id: true,
      title: true,
      image: true,
      images: true,
      source: true
    }
  })

  console.log("--- Sample Products without source ---")
  if (products.length === 0) {
    console.log("No products found without source!")
  }
  for (const p of products) {
    console.log(`ID: ${p.id}`)
    console.log(`Title: ${p.title}`)
    console.log(`Image: ${p.image}`)
    console.log(`Images: ${p.images}`)
    console.log(`Source: ${p.source}`)
    console.log("---")
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
