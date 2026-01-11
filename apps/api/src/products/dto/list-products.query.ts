import { ApiPropertyOptional } from '@nestjs/swagger'
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'
import { Type } from 'class-transformer'

export class ListProductsQueryDto {
  @ApiPropertyOptional({
    description: 'Search by name, brand or SKU',
    example: 'brake',
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({
    description: 'Category name',
    example: 'Brakes',
  })
  @IsOptional()
  @IsString()
  category?: string

  @ApiPropertyOptional({
    description: 'Brand name',
    example: 'Brembo',
  })
  @IsOptional()
  @IsString()
  brand?: string

  @ApiPropertyOptional({
    description: 'Min price in dollars',
    example: 20,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number

  @ApiPropertyOptional({
    description: 'Max price in dollars',
    example: 200,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number

  @ApiPropertyOptional({
    description: 'Page number (starts from 1)',
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number

  @ApiPropertyOptional({
    description: 'Items per page',
    default: 12,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  pageSize?: number
}