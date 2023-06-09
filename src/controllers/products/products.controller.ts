import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'No brand specified',
  ) {
    return {
      message: `Lista de productos, limit: ${limit} offset: ${offset}, brand: ${brand}`,
    };
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`,
    };
  }

  // para que la ruta anterior con choque con esta,
  // se debe colocar primero la ruta NO dinamica

  @Get(':productId')
  getOne(@Param('productId') productId: string) {
    return {
      message: `Producto con id: ${productId}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload,
    };
  }
}
