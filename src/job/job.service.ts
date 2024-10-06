import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import { CloudinaryService } from '../cloundinary/cloudinary.service';
import { CreateJobDto, JobListResponseDto } from './dto/create-job.dto';
import { UpdateJobDto, UpdateJobResponse } from './dto/update-job.dto';


@Injectable()
export class JobService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService
  ) {}

  // Hàm hỗ trợ để lấy public_id từ URL Cloudinary
  private getPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }

  async createJob(createJobDto: CreateJobDto, file: Express.Multer.File, creatorId: number): Promise<{ message: string; content: any }> {
    try {
      let imageUrl = null;
      if (file) {
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        imageUrl = uploadResult.secure_url;
      }
  
      const newJob = await this.prisma.jobs.create({
        data: {
          name: createJobDto.name,
          price: parseInt(createJobDto.price.toString()),
          short_description: createJobDto.short_description,
          description: createJobDto.description,
          job_type_detail_id: parseInt(createJobDto.job_type_detail_id.toString()),
          creator_id: creatorId,
          image: imageUrl,
        },
      });
  
      return {
        message: 'Tạo công việc thành công',
        content: newJob,
      };
    } catch (error) {
      throw new Error(`Lỗi khi tạo công việc: ${error.message}`);
    }
  }

  async findAll(): Promise<JobListResponseDto> {
    try {
      const jobs = await this.prisma.jobs.findMany();
      return {
        message: 'Lấy danh sách công việc thành công',
        content: jobs,
      };
    } catch (error) {
      throw new Error('Không thể lấy danh sách công việc');
    }
  }

  async updateJob(updateJobDto: UpdateJobDto, file: Express.Multer.File, userId: number): Promise<UpdateJobResponse> {
    try {
      const existingJob = await this.prisma.jobs.findUnique({
        where: { id: parseInt(updateJobDto.id.toString()) },
      });
  
      if (!existingJob) {
        throw new Error('Không tìm thấy công việc');
      }
  
      if (existingJob.creator_id !== userId) {
        throw new Error('Bạn không có quyền cập nhật công việc này');
      }
  
      const updateData: any = {};
  
      if (updateJobDto.name) updateData.name = updateJobDto.name;
      if (updateJobDto.price) updateData.price = parseInt(updateJobDto.price.toString());
      if (updateJobDto.short_description) updateData.short_description = updateJobDto.short_description;
      if (updateJobDto.description) updateData.description = updateJobDto.description;
      if (updateJobDto.job_type_detail_id) updateData.job_type_detail_id = updateJobDto.job_type_detail_id;
  
      if (file) {
        // Xóa ảnh cũ nếu có
        if (existingJob.image) {
          const publicId = this.getPublicIdFromUrl(existingJob.image);
          await this.cloudinaryService.deleteImage(publicId);
        }
  
        // Upload ảnh mới
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        updateData.image = uploadResult.secure_url;
      }
  
      const updatedJob = await this.prisma.jobs.update({
        where: { id: parseInt(updateJobDto.id.toString()) },
        data: updateData,
      });
  
      return {
        message: 'Cập nhật công việc thành công',
        content: updatedJob,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật công việc: ${error.message}`);
    }
  }
  
  async deleteJob(jobId: number, userId: number): Promise<{ message: string }> {
    try {
      const existingJob = await this.prisma.jobs.findUnique({
        where: { id: jobId },
      });
  
      if (!existingJob) {
        throw new Error('Không tìm thấy công việc');
      }
  
      if (existingJob.creator_id !== userId) {
        throw new Error('Bạn không có quyền xóa công việc này');
      }
  
      // Xóa ảnh trên Cloudinary nếu có
      if (existingJob.image) {
        const publicId = this.getPublicIdFromUrl(existingJob.image);
        await this.cloudinaryService.deleteImage(publicId);
      }
  
      // Xóa công việc trong database
      await this.prisma.jobs.delete({
        where: { id: jobId },
      });
  
      return { message: 'Xóa công việc thành công' };
    } catch (error) {
      throw new Error(`Lỗi khi xóa công việc: ${error.message}`);
    }
  }

  async getJobById(jobId: number): Promise<{ message: string; content: any }> {
    try {
      const job = await this.prisma.jobs.findUnique({
        where: { id: jobId },
      });
  
      if (!job) {
        throw new Error('Không tìm thấy công việc');
      }
  
      return {
        message: 'Lấy thông tin công việc thành công',
        content: job,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin công việc: ${error.message}`);
    }
  }

  async findJobsByTypeId(jobTypeDetailId: number): Promise<JobListResponseDto> {
    try {
      const jobs = await this.prisma.jobs.findMany({
        where: { job_type_detail_id: jobTypeDetailId },
      });
  
      return {
        message: 'Lấy danh sách công việc theo loại thành công',
        content: jobs,
      };
    } catch (error) {
      throw new Error(`Không thể lấy danh sách công việc theo loại: ${error.message}`);
    }
  }

}




  
