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
    private commentRepository: Repository<Comment>
  ){}
  async create(createCommentDto:CreateCommentDto) {
    console.log(createCommentDto)
    const newcomment = this.commentRepository.create(createCommentDto)
    await this.commentRepository.save(newcomment)
    return newcomment
  }
}
