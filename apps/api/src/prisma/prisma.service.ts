import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

@Injectable()
export class PrismaService {
  private readonly _client = new PrismaClient().$extends(withAccelerate())

  get client() {
    return this._client
  }
}