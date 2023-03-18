import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    public readonly commentRepo: Repository<Comment>
  ){}
  async create(createCommentDto:CreateCommentDto){
     const newcomment = await this.commentRepo.create(createCommentDto)
    this.commentRepo.save(newcomment)
    return newcomment
  }
}
