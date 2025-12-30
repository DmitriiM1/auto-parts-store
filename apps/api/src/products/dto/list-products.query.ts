import { Transform } from 'class-transformer'
import { IsInt, IsOptional, IsString, Min } from 'class-validator'

export class ListProductsQueryDto {
  @IsOptional()
  @IsString()
  search?: string

  @IsOptional()
  @IsString()
  category?: string

  @IsOptional()
  @IsString()
  brand?: string


  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? undefined : Number(value)))
  @Min(0)
  minPrice?: number

  @IsOptional()
  @Transform(({ value }) => (value === '' || value == null ? undefined : Number(value)))
  @Min(0)
  maxPrice?: number

  @IsOptional()
  @Transform(({ value }) => (value == null ? 1 : Number(value)))
  @IsInt()
  @Min(1)
  page: number = 1

  @IsOptional()
  @Transform(({ value }) => (value == null ? 12 : Number(value)))
  @IsInt()
  @Min(1)
  pageSize: number = 12
}