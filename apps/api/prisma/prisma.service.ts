import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

@Injectable()
export class PrismaService {
  private readonly _client = new PrismaClient().$extends(withAccelerate())

  get client() {
    return this._client
  }

  get product() {
    return this._client.product
  }

  get category() {
    return this._client.category
  }

  get order() {
    return this._client.order
  }

  get orderItem() {
    return this._client.orderItem
  }
}