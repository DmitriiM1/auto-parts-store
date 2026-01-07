import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    return this.prisma.client.category.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true },
    })
  }
}