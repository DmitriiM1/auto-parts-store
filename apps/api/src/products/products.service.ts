import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { ListProductsQueryDto } from './dto/list-products.query'
import type { Product, Category } from '@prisma/client'
import { CreateProductDto } from './dto/create-product.dto'

type ProductWithCategory = Product & { category: Category }

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private toProductDto(product: ProductWithCategory) {
    return {
      id: product.id,
      name: product.name,
      brand: product.brand,
      sku: product.sku,
      price: Number((product.priceCents / 100).toFixed(2)),
      stock: product.stock,
      imageUrl: product.imageUrl,
      categoryId: product.categoryId,
      categoryName: product.category.name,
    }
  }

  async list(q: ListProductsQueryDto) {
    const page = q.page ?? 1
    const pageSize = q.pageSize ?? 12
    const skip = (page - 1) * pageSize

    const where: any = {}

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
      where.category = { name: { equals: q.category, mode: 'insensitive' } }
    }

    if (q.minPrice != null || q.maxPrice != null) {
      where.priceCents = {}
      if (q.minPrice != null) where.priceCents.gte = Math.round(q.minPrice * 100)
      if (q.maxPrice != null) where.priceCents.lte = Math.round(q.maxPrice * 100)
    }

    const [rawItems, total] = await Promise.all([
      this.prisma.client.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.prisma.client.product.count({ where }),
    ])

    const items = rawItems as unknown as ProductWithCategory[]

    return {
      page,
      pageSize,
      total,
      items: items.map(p => this.toProductDto(p)),
    }
  }

  async getById(id: string) {
    const product = await this.prisma.client.product.findUnique({
      where: { id },
      include: { category: true },
    })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return this.toProductDto(product as ProductWithCategory)
  }

  async create(dto: CreateProductDto) {
    const priceCents = Math.round(dto.price * 100)

    const product = await this.prisma.client.product.create({
      data: {
        name: dto.name,
        brand: dto.brand,
        sku: dto.sku,
        priceCents,
        stock: dto.stock,
        imageUrl: dto.imageUrl,
        categoryId: dto.categoryId,
      },
      include: {
        category: true,
      },
    })

    return this.toProductDto(product as ProductWithCategory)
  }
}