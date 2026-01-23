import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data (safe for dev)
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const brakes = await prisma.category.create({
    data: { name: 'Brakes' },
  })

  const filters = await prisma.category.create({
    data: { name: 'Filters' },
  })

  const oil = await prisma.category.create({
    data: { name: 'Oil' },
  })

  const suspension = await prisma.category.create({
    data: { name: 'Suspension' },
  })

  await prisma.product.createMany({
    data: [
      {
        name: 'Brake Pads',
        brand: 'Brembo',
        sku: 'BR-BREM-001',
        priceCents: 7500,
        stock: 25,
        categoryId: brakes.id,
      },
      {
        name: 'Brake Disc',
        brand: 'Bosch',
        sku: 'BR-BOSC-002',
        priceCents: 11200,
        stock: 15,
        categoryId: brakes.id,
      },
      {
        name: 'Oil Filter',
        brand: 'MANN',
        sku: 'FLT-MANN-003',
        priceCents: 1800,
        stock: 40,
        categoryId: filters.id,
      },
      {
        name: 'Air Filter',
        brand: 'Mahle',
        sku: 'FLT-MAHL-004',
        priceCents: 2400,
        stock: 30,
        categoryId: filters.id,
      },
      {
        name: 'Engine Oil 5W-30',
        brand: 'Castrol',
        sku: 'OIL-CSTR-005',
        priceCents: 5200,
        stock: 50,
        categoryId: oil.id,
      },
      {
        name: 'Shock Absorber',
        brand: 'KYB',
        sku: 'SUSP-KYB-006',
        priceCents: 8900,
        stock: 12,
        categoryId: suspension.id,
      },
      {
        name: 'DOT 4 Brake Fluid 1L',
        brand: 'ATE',
        sku: 'BR-ATE-007',
        priceCents: 2900,
        stock: 25,
        categoryId: brakes.id,
      },
      {
        name: 'Cabin Air Filter',
        brand: 'MANN',
        sku: 'FLT-MANN-008',
        priceCents: 2600,
        stock: 40,
        categoryId: filters.id,
      },
      {
        name: 'Fuel Filter',
        brand: 'Mahle',
        sku: 'FLT-MAHL-009',
        priceCents: 3400,
        stock: 30,
        categoryId: filters.id,
      },
      {
        name: 'Engine Oil 5W-40 Full Synthetic',
        brand: 'Castrol',
        sku: 'OIL-CSTR-010',
        priceCents: 5800,
        stock: 35,
        categoryId: oil.id,
      },
      {
        name: 'Front Control Arm (Left)',
        brand: 'Lemförder',
        sku: 'SUSP-LEMF-011',
        priceCents: 13900,
        stock: 12,
        categoryId: suspension.id,
      },
    ],
  })

  console.log('✅ Database seeded successfully')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })