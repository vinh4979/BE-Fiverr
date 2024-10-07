import { Controller, Post, Body, Get, Param, UseGuards, Request, Patch, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from '../config/jwt-auth.guard';
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@ApiTags('comments')
@ApiBearerAuth('access-token')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Bình luận công việc' })
  @ApiResponse({ status: 201, description: 'Bình luận đã được tạo thành công' })
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.commentService.createComment(createCommentDto, userId);
  }

  @Get(':jobId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sach bình luận theo công việc' })
  @ApiResponse({ status: 200, description: 'Danh sách bình luận đã được lấy thành công' })
  async getCommentsByJobId(@Param('jobId') jobId: string) {
    return this.commentService.getCommentsByJobId(Number(jobId));
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chỉnh sửa bình luận công việc' })
  @ApiResponse({ status: 200, description: 'Bình luận đã được cập nhật thành công' })
  async updateComment(
    @Body() updateCommentDto: UpdateCommentDto,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.commentService.updateComment(updateCommentDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xoá bình luận công việc' })
  @ApiResponse({ status: 200, description: 'Bình luận đã được xóa thành công' })
  async deleteComment(
    @Param('id') id: string,
    @Request() req
  ) {
    const userId = req.user.id;
    return this.commentService.deleteComment(Number(id), userId);
  }
}