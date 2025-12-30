import { Injectable } from '@nestjs/common'
import { ListProductsQueryDto } from './dto/list-products.query'

@Injectable()
export class ProductsService {
  list(query: ListProductsQueryDto) {
    return { ok: true, query }
  }
}