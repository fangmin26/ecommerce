import { Controller, Post, Body,  UseGuards, HttpException, HttpStatus, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@user/guard/role.guard';
import { Role } from '@user/entities/role.enum';
import { UpdatedProductDto } from './dto/update-product.dto';
@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiResponse({status:200, description:"success create product"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: 'product 생성', description: 'product 생성',})
  @UseGuards(RoleGuard(Role.USER))
  async create(@Body() createProductDto: CreateProductDto) {
     return await this.productService.create(createProductDto)
  }

  @Get('all')
  @ApiResponse({status:200, description:"get productall"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: 'product all get', description: 'product all get',})
  async getProductAll(){
    return await this.productService.getAll()
  }

  @Get(':id')
  @ApiResponse({status:200, description:"success get product id"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: 'product id get', description: 'product id get',})
  async getProductById(@Param('id') id:string){
    if(id!== undefined){
      return this.productService.getById(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }

  @Get('edit/:id')
  @ApiResponse({status:200, description:"success edit product id"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: 'product id edit', description: 'product id edit',})
  async edit(@Body() updatedProductDto:UpdatedProductDto, @Param('id') id:string){
    await this.productService.update(updatedProductDto,id)
  }

  @Get('delete/:id')
  @ApiResponse({status:200, description:"success delete product id"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: "delete product id", description: "delete product id",})
  async deleteProduct(@Param('id') id:string){
    if(id!== undefined){
      return this.productService.deleteProduct(id)
    }else{
      throw new HttpException('product id가 없습니다',HttpStatus.NOT_FOUND)
    }
  }

  
}
