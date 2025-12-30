import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ListProductsQueryDto } from './dto/list-products.query'

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    list(@Query() query: ListProductsQueryDto) {
        return this.productsService.list(query)
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.getById(id)
    }
}