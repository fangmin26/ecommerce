import { Controller, Post, Body,  UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '@user/guard/role.guard';
import { Role } from '@user/entities/role.enum';

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
}
