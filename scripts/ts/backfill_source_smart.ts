
import { prisma } from '@/lib/prisma'

async function main() {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { source: null },
        { source: '' }
      ]
    },
    select: {
      id: true,
      image: true,
      images: true
    }
  })

  console.log(`Analyzing ${products.length} products with missing source...`)

  let peoraCount = 0
  let adoreCount = 0
  let amazonCount = 0
  let unknownCount = 0

  const updates: { id: string, source: string }[] = []

  for (const p of products) {
    const img = (p.image || (p.images && p.images[0]) || "").toLowerCase()
    
    let source = ""
    if (img.includes("shopify")) {
      if (img.includes("/1/0598/4573/8659/")) {
           source = "Peora"
           peoraCount++
      } else if (img.includes("/1/0560/7889/3117/")) {
           source = "Adore By Priyanka"
           adoreCount++ 
      } else {
           // Fallback or count distinct
           source = "Shopify"
           unknownCount++
           console.log("Unknown Shopify ID:", img)
      }
    } else if (img.includes("amazon") || img.includes("m.media-amazon")) {
      source = "Amazon"
      amazonCount++
    } else {
      unknownCount++
      console.log("Unknown source for image:", img)
    }

    if (source && source !== "Shopify") {
      updates.push({ id: p.id, source })
    }
  }

  console.log("--- Analysis Results ---")
  console.log(`Peora: ${peoraCount}`)
  console.log(`Adore: ${adoreCount}`)
  console.log(`Amazon: ${amazonCount}`)
  console.log(`Unknown/Other: ${unknownCount}`)
  
  if (process.argv.includes('--execute')) {
    console.log("Executing updates...")
    for (const update of updates) {
      await prisma.product.update({
        where: { id: update.id },
        data: { source: update.source }
      })
    }
    console.log("Updates completed.")
  } else {
    console.log("Run with --execute to apply changes.")
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
