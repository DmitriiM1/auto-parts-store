import { ApiProperty } from '@nestjs/swagger'

export class ProductDto {
  @ApiProperty()
  id: string

  @ApiProperty()
  name: string

  @ApiProperty()
  brand: string

  @ApiProperty()
  sku: string

  @ApiProperty({
    description: 'Unit price in dollars',
    example: 75,
  })
  price: number

  @ApiProperty()
  stock: number

  @ApiProperty({
    required: false,
    nullable: true,
  })
  imageUrl?: string | null

  @ApiProperty()
  categoryId: string

  @ApiProperty({
    description: 'Category name',
    example: 'Brakes',
  })
  categoryName: string
}

export class PaginatedProductsDto {
  @ApiProperty()
  page: number

  @ApiProperty()
  pageSize: number

  @ApiProperty()
  total: number

  @ApiProperty({ type: ProductDto, isArray: true })
  items: ProductDto[]
}