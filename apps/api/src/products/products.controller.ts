import { Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ListProductsQueryDto } from './dto/list-products.query'
import { ApiOkResponse, ApiTags, ApiQuery } from '@nestjs/swagger'
import { PaginatedProductsDto } from './dto/product.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }


    @ApiQuery({ name: 'search', required: false })
    @ApiQuery({ name: 'category', required: false })
    @ApiQuery({ name: 'brand', required: false })
    @ApiQuery({ name: 'minPrice', required: false, type: Number })
    @ApiQuery({ name: 'maxPrice', required: false, type: Number })
    @ApiQuery({ name: 'page', required: false, type: Number })
    @ApiQuery({ name: 'pageSize', required: false, type: Number })

    @Get()
    @ApiOkResponse({
        description: 'List of products',
        type: PaginatedProductsDto,
    })
    async list(
        @Query() query: ListProductsQueryDto,
    ): Promise<PaginatedProductsDto> {
        return this.productsService.list(query)
    }

    @ApiOkResponse({ description: 'Get product by ID' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.getById(id)
    }


}