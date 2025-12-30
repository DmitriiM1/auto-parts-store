import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ListProductsQueryDto } from './dto/list-products.query'

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(q: ListProductsQueryDto) {
    const page = q.page ?? 1
    const pageSize = q.pageSize ?? 12
    const skip = (page - 1) * pageSize

    const where: any = {}

    // search by name/brand/sku
    if (q.search) {
      where.OR = [
        { name: { contains: q.search, mode: 'insensitive' } },
        { brand: { contains: q.search, mode: 'insensitive' } },
        { sku: { contains: q.search, mode: 'insensitive' } },
      ]
    }

    if (q.brand) {
      where.brand = { equals: q.brand, mode: 'insensitive' }
    }

    if (q.category) {
      // filter by category name
      where.category = {
        name: { equals: q.category, mode: 'insensitive' },
      }
    }

    // prices come as dollars in query -> convert to cents
    if (q.minPrice != null || q.maxPrice != null) {
      where.priceCents = {}
      if (q.minPrice != null) where.priceCents.gte = Math.round(q.minPrice * 100)
      if (q.maxPrice != null) where.priceCents.lte = Math.round(q.maxPrice * 100)
    }

    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.product.count({ where }),
    ])

    return {
      page,
      pageSize,
      total,
      items: items.map(p => ({
        ...p,
        price: Number((p.priceCents / 100).toFixed(2)),
      })),
    }
  }

  async getById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!product) throw new NotFoundException('Product not found')

    return {
      ...product,
      price: Number((product.priceCents / 100).toFixed(2)),
    }
  }
}