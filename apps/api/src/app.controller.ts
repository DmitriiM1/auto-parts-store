import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getRoot() {
    return {
      name: 'Auto Parts Store API',
      status: 'ok',
      docs: '/docs',
      products: '/products',
    }
  }
}
