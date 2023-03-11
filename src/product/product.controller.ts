import { Controller, Post, Body,  UseGuards, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@user/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { UpdatedProductDto } from './dto/update-product.dto';
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiResponse({status:200, description:"create product"})
  @ApiResponse({status:401, description:"forbidden"})
  @Post()
  @UseGuards(RoleGuard(Role.USER))
  async create(@Body() createProductDto: CreateProductDto) {
     return await this.productService.create(createProductDto)
  }

  @Get()
  async getProductAll(){
    await this.productService.getAll()
  }

  @Get(':id')
  async getProductById(@Param('id') id:string){
    if(id!== undefined){
      return this.productService.getById(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }

  @Get('edit/:id')
  async edit(@Body() updatedProductDto:UpdatedProductDto, @Param('id') id:string){

    await this.productService.update(updatedProductDto,id)
  }

  @Get('delete/:id')
  async deleteProduct(@Param('id') id:string){
    console.log(id,'id')
    if(id!== undefined){
      return this.productService.deleteProduct(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }
}
