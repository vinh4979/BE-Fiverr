import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { Comments } from '@prisma/client';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async createComment(
    createCommentDto: CreateCommentDto,
    userId: number
  ): Promise<{ message: string; content: Comments }> {
    const job = await this.prismaService.jobs.findUnique({
      where: { id: createCommentDto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Công việc không tồn tại');
    }

    const comment = await this.prismaService.comments.create({
      data: {
        job_id: createCommentDto.jobId,
        user_id: userId,
        content: createCommentDto.content,
        stars: createCommentDto.stars,
      },
    });

    await this.updateJobRating(createCommentDto.jobId);

    return {
      message: 'Bình luận đã được tạo thành công',
      content: comment,
    };
  }

  async getCommentsByJobId(jobId: number): Promise<{ message: string; content: Comments[] }> {
    const comments = await this.prismaService.comments.findMany({
      where: { job_id: Number(jobId) },
    //   include: { Users: true },
    });
  
    return {
      message: 'Danh sách bình luận đã được lấy thành công',
      content: comments,
    };
  }

  private async updateJobRating(jobId: number): Promise<void> {
    const comments = await this.prismaService.comments.findMany({
      where: { job_id: jobId },
    });

    const totalStars = comments.reduce((sum, comment) => sum + comment.stars, 0);
    const averageRating = comments.length > 0 ? totalStars / comments.length : 0;

    await this.prismaService.jobs.update({
      where: { id: jobId },
      data: { rating: Math.round(averageRating) },
    });
  }

  async updateComment(
    updateCommentDto: UpdateCommentDto,
    userId: number
  ): Promise<{ message: string; content: Comments }> {
    const comment = await this.prismaService.comments.findUnique({
      where: { id: updateCommentDto.id },
    });
  
    if (!comment) {
      throw new NotFoundException('Bình luận không tồn tại');
    }
  
    if (comment.user_id !== userId) {
      throw new UnauthorizedException('Bạn không có quyền chỉnh sửa bình luận này');
    }
  
    const updatedComment = await this.prismaService.comments.update({
      where: { id: updateCommentDto.id },
      data: {
        content: updateCommentDto.content,
        stars: updateCommentDto.stars,
      },
    });
  
    await this.updateJobRating(comment.job_id);
  
    return {
      message: 'Bình luận đã được cập nhật thành công',
      content: updatedComment,
    };
  }

  async deleteComment(
    commentId: number,
    userId: number
  ): Promise<{ message: string }> {
    const comment = await this.prismaService.comments.findUnique({
      where: { id: commentId },
    });
  
    if (!comment) {
      throw new NotFoundException('Bình luận không tồn tại');
    }
  
    if (comment.user_id !== userId) {
      throw new UnauthorizedException('Bạn không có quyền xóa bình luận này');
    }
  
    await this.prismaService.comments.delete({
      where: { id: commentId },
    });
  
    await this.updateJobRating(comment.job_id);
  
    return {
      message: 'Bình luận đã được xóa thành công',
    };
  }

  
}