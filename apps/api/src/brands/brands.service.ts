import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const rows = await this.prisma.client.product.findMany({
      distinct: ['brand'],
      select: { brand: true },
      orderBy: { brand: 'asc' },
    })

    return rows
      .map(r => r.brand)
      .filter(Boolean)
  }
}