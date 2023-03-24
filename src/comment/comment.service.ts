import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@root/product/entities/product.entity';
import { ProductService } from '@root/product/product.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    public readonly commentRepo: Repository<Comment>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ){}
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const product = await this.productRepository.findOneBy(
      {id:createCommentDto.productId}
    );

    const comment = new Comment();
    comment.contents = createCommentDto.contents;
    comment.product = product;

    return await this.commentRepo.save(comment);
  }
}
