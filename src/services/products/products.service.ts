import { Injectable } from '@nestjs/common';
import { Product } from '../../entities-models/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  // en los servicios por lo general se consulta una base de datos
  // pero para este ejemplo se usara un arreglo en memoria
  private products: Product[] = [
    {
      id: 1,
      name: 'First Product',
      description: 'This is the first product',
      price: 10,
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any): Product {
    this.counterId++;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any): Product {
    console.log('🚀 ~ ProductsService ~ id:', id);
    const product = this.findOne(id);
    console.log('🚀 ~ ProductsService ~ product:', product);
    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...product, ...payload };
      return this.products[index];
    }
    return null;
  }
}
