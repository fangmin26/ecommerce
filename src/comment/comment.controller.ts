import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProductService } from '@root/product/product.service';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    ) {}

  @Post()
  @ApiResponse({status:200, description:"success edit product id"})
  @ApiResponse({status:401, description:"forbidden"})
  @ApiOperation({ summary: 'product comment', description: 'product comment',})
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
}
}
