import {
  Body,
  Post,
  Patch,
  Delete,
  UseGuards,
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiTags,
  ApiQuery,
  ApiNotFoundResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { ProductsService } from './products.service'
import { ListProductsQueryDto } from './dto/list-products.query'
import { PaginatedProductsDto, ProductDto } from './dto/product.dto'
import { AdminGuard } from '../auth/admin.guard'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ---------- PUBLIC READ ENDPOINTS ----------

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

  // ---------- ADMIN-ONLY MUTATION ENDPOINTS ----------

  @UseGuards(AdminGuard)
  @ApiCreatedResponse({
    description: 'Create a new product',
    type: ProductDto,
  })
  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body)
  }

  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'Update an existing product',
    type: ProductDto,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body)
  }

  @UseGuards(AdminGuard)
  @ApiOkResponse({
    description: 'Delete a product',
    schema: { example: { success: true } },
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id)
  }
}