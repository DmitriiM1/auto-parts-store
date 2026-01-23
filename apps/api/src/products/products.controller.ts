import { Body, Post, UseGuards, Controller, Get, Param, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ListProductsQueryDto } from './dto/list-products.query'
import { ApiOkResponse, ApiTags, ApiQuery, ApiNotFoundResponse } from '@nestjs/swagger'
import { PaginatedProductsDto, ProductDto } from './dto/product.dto'
import { AdminGuard } from '../auth/admin.guard'
import { CreateProductDto } from './dto/create-product.dto'

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

    
    @ApiOkResponse({
        description: 'List of products',
        type: PaginatedProductsDto,
    })
    @Get()
    list(@Query() query: ListProductsQueryDto) {
        return this.productsService.list(query)
    }

    @ApiOkResponse({
        description: 'Get product by ID',
        type: ProductDto,
    })
    @ApiNotFoundResponse({ description: 'Product not found' })
    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.productsService.getById(id)
    }

    @Post()
    @UseGuards(AdminGuard)
    @ApiOkResponse({
        description: 'Create a new product',
        type: ProductDto,
    })
    create(@Body() body: CreateProductDto) {
        return this.productsService.create(body)
    }


}