import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../../services/products/products.service';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('brand') brand = 'No brand specified',
  ) {
    // return {
    //   message: `Lista de productos, limit: ${limit} offset: ${offset}, brand: ${brand}`,
    // };
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductFilter() {
    return {
      message: `Yo soy un filter`,
    };
  }
  @Post()
  create(@Body() payload: CreateProductDto) {
    console.log('🚀 ~ ProductsController ~ payload:', payload);
    // return {
    //   message: 'accion de crear',
    //   payload,
    // };
    return this.productsService.create(payload);
  }

  // para que la ruta anterior con choque con esta,
  // se debe colocar primero la ruta NO dinamica

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    // return {
    //   message: `Producto con id: ${productId} y HTTP status custom: ${HttpStatus.ACCEPTED}`,
    // };
    return this.productsService.findOne(productId);
    // el id viene como string del Query pero toca pasarlo a number para ejecutarlo
    // se arregla con el PIPE ParseIntPipe
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) productId: number,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   id,
    //   payload,
    // };
    return this.productsService.update(Number(productId), payload); // el id viene como string del Query pero toca pasarlo a number para ejecutarlo
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) productId: number) {
    // return {
    //   id,
    //   message: 'accion de eliminar',
    // };
    return this.productsService.remove(productId);
  }
}
