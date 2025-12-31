import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly _client = new PrismaClient().$extends(withAccelerate())

  get client() {
    return this._client
  }

  async onModuleInit() {
    await this._client.$connect()
  }

  async onModuleDestroy() {
    await this._client.$disconnect()
  }
}