
import { prisma } from '@/lib/prisma'

async function main() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { source: null },
        { source: '' }
      ]
    },
    take: 20,
    select: {
      id: true,
      image: true
    }
  })

  console.log("Analyzing image domains...")
  const domains = new Set<string>()

  for (const p of products) {
    try {
      if (p.image) {
        const url = new URL(p.image)
        domains.add(url.hostname)
        console.log(`Domain: ${url.hostname} | Image: ${p.image}`)
      }
    } catch {
      console.log(`Invalid URL: ${p.image}`)
    }
  }

  console.log("\nUnique Domains Found:")
  domains.forEach(d => console.log(d))
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
