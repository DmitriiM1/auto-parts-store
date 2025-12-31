import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ListProductsQueryDto } from './dto/list-products.query'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @ApiOkResponse({ description: 'List of products' })
    @Get()
    list(@Query() query: ListProductsQueryDto) {
        return this.productsService.list(query)
    }

    @ApiOkResponse({ description: 'Get product by ID' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.getById(id)
    }
}