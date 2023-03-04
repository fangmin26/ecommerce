import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@root/user/guard/role.guard';
import { Role } from '@root/user/entities/role.enum';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(RoleGuard(Role.USER))
  async create(@Body() createProductDto: CreateProductDto) {
     await this.productService.create(createProductDto)
  }


}
