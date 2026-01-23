import { ApiProperty } from '@nestjs/swagger'
import {
  IsString,
  IsNumber,
  IsInt,
  Min,
  IsOptional,
} from 'class-validator'

export class CreateProductDto {
  @ApiProperty({ example: 'Brake Pads Front' })
  @IsString()
  name: string

  @ApiProperty({ example: 'Brembo' })
  @IsString()
  brand: string

  @ApiProperty({ example: 'BR-BREM-010' })
  @IsString()
  sku: string

  @ApiProperty({ example: 75, description: 'Unit price in dollars' })
  @IsNumber()
  @Min(0)
  price: number

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(0)
  stock: number

  @ApiProperty({
    required: false,
    example: '/images/products/BR-BREM-010.jpeg',
  })
  @IsOptional()
  @IsString()
  imageUrl?: string

  @ApiProperty({
    example: 'cmjqpjl830000rq4ld81lc4cn',
    description: 'Category ID',
  })
  @IsString()
  categoryId: string
}