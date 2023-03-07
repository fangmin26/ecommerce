import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdatedProductDto } from './dto/update-product.dto';
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

  async getAll(){
    console.log(await this.productRepository.find({}))
    return await this.productRepository.find({})
  }

  async getById(id:number){
    const findId = await this.productRepository.findOneBy({id})
    try {
      if(findId&& findId!== null){
        return findId
      }else{
        throw new HttpException('id가 없습니다.', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException('id가 없습니다.', HttpStatus.NOT_FOUND)
    }
  }

  async update( updatedProductDto:UpdatedProductDto, id:number) {
    // const findId = await this.productRepository.findOneBy({id})
   const findId = await this.getById(id)
    try {
      await this.productRepository.update({id},{
        title: updatedProductDto.title,
        content: updatedProductDto.content,
        startFunding: updatedProductDto.startFunding,
        startDeleviery: updatedProductDto.startDeleviery,
        deliveryFee: updatedProductDto.deliveryFee,
        productLimit: updatedProductDto.productLimit,
        price: updatedProductDto.price 
      })
      return 'success'
    } catch (error) {
      throw new HttpException('업데이트에러.', HttpStatus.BAD_REQUEST)
    }
  }

  async deleteProduct(id:number){
    const findId = await this.getById(id)

    try {
      if(findId){
        if(id) await this.productRepository.delete({id})
        else throw new HttpException('입력한 id가 없습니다.', HttpStatus.NOT_FOUND)
      }else{
        throw new HttpException('삭제할 id정보가 없습니다.', HttpStatus.NOT_FOUND)
      }
    } catch (error) {
      throw new HttpException('삭제에러.', HttpStatus.BAD_REQUEST)
    }
  }
}
