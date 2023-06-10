import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

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
  @Post()
  create(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload,
    };
  }

  // para que la ruta anterior con choque con esta,
  // se debe colocar primero la ruta NO dinamica

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return {
      message: `Producto con id: ${productId} y HTTP status custom: ${HttpStatus.ACCEPTED}`,
    };
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      id,
      payload,
    };
  }
  @Delete(':id')
  delete(@Param('id') id: number) {
    return {
      id,
      message: 'accion de eliminar',
    };
  }
}
