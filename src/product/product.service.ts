import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository:Repository<Product> 
  ){}
  async create(createProductDto: CreateProductDto) {
    const newProduct = await this.productRepository.create(createProductDto)
    await this.productRepository.save(newProduct)
    return newProduct;
  }

}
