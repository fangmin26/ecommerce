import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Product } from '@root/product/entities/product.entity';

@Module({
  imports:[
    // TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Comment, Product])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
