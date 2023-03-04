import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { UserModule } from '@root/user/user.module';
import { AuthModule } from '@root/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [ProductController],
  providers: [ProductService],
  // exports: [ProductService]
})
export class ProductModule {}
