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
     await this.productService.create(createProductDto)
  }

  @Get()
  async getProductAll(){
    await this.productService.getAll()
  }

  @Get(':id')
  async getProductById(@Param('id') id:number){
    if(id!== undefined){
      return this.productService.getById(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }

  @Post('edit')
  async edit(@Body() updatedProductDto:UpdatedProductDto, @Body('id') id:number){
    await this.productService.update(updatedProductDto,id)
  }

  @Post('delete')
  async deleteProduct(@Body('id') id:number){
    if(id!== undefined){
      return this.productService.deleteProduct(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }


}
