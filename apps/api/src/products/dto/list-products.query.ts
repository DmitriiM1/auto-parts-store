import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class ListProductsQueryDto {
  @ApiPropertyOptional({ example: 'bosch', description: 'Search by name, brand or SKU' })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({ example: 'Brakes', description: 'Category name' })
  @IsOptional()
  @IsString()
  category?: string

  @ApiPropertyOptional({ example: 'Bosch', description: 'Brand name' })
  @IsOptional()
  @IsString()
  brand?: string

  @ApiPropertyOptional({ example: 10, description: 'Min price in dollars' })
  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? undefined : Number(value)))
  @Min(0)
  minPrice?: number

  @ApiPropertyOptional({ example: 200, description: 'Max price in dollars' })
  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? undefined : Number(value)))
  @Min(0)
  maxPrice?: number

  @ApiPropertyOptional({ example: 1, description: 'Page number (starts from 1)' })
  @IsOptional()
  @Transform(({ value }) => (value == null ? 1 : Number(value)))
  @IsInt()
  @Min(1)
  page: number = 1

  @ApiPropertyOptional({ example: 12, description: 'Items per page' })
  @IsOptional()
  @Transform(({ value }) => (value == null ? 12 : Number(value)))
  @IsInt()
  @Min(1)
  pageSize: number = 12
}