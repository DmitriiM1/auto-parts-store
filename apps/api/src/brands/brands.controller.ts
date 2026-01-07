import { Controller, Get } from '@nestjs/common'
import { ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { BrandsService } from './brands.service'

@ApiTags('brands')
@Controller('brands')
export class BrandsController {
  constructor(private readonly brands: BrandsService) {}

  @Get()
  @ApiOkResponse({ description: 'List of brands' })
  list() {
    return this.brands.list()
  }
}