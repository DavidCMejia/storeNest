import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'No brand specified',
  ) {
    return `Lista de productos, limit: ${limit} offset: ${offset}, brand: ${brand}`;
  }

  @Get('filter')
  getProductFilter() {
    return `Yo soy un filter`;
  }

  // para que la ruta anterior con choque con esta,
  // se debe colocar primero la ruta NO dinamica

  @Get(':productId')
  getProduct(@Param('productId') productId: string) {
    return `Product ${productId}`;
  }
}
