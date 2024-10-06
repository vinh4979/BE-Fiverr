import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prismaService';
import {  CreateJobTypeDetailDto, DeleteJobDetailDto, JobTypeDetailDto, ResponseDto, UpdateJobTypeDetailDto, UpdateJobTypeDetailImageDto, UpdateJobTypeDetailJobDetailDto } from './dto/job-detail.dto';
import { CloudinaryService } from 'src/cloundinary/cloudinary.service';

@Injectable()
export class JobDetailService {
  constructor(
    private prisma: PrismaService,
    private cloudinaryService: CloudinaryService) {}

  async getJobTypeDetails(): Promise<ResponseDto> {
    try {
      const jobTypeDetails = await this.prisma.jobTypeDetails.findMany({
        include: {
          jobDetail: {
            include: {
              detail: true,
            },
          },
        },
      });
  
      const formattedJobTypeDetails: JobTypeDetailDto[] = jobTypeDetails.map((jtd) => ({
        id: jtd.id,
        name: jtd.name,
        image: jtd.image,
        job_type_id: jtd.job_type_id,
        jobDetail: jtd.jobDetail.map((jd) => ({
          id: jd.detail.id,
          detail_name: jd.detail.detail_name,
        })),
      }));
  
      return {
        message: 'Lấy danh sách JobTypeDetails thành công',
        content: formattedJobTypeDetails,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy danh sách JobTypeDetails: ${error.message}`);
    }
  }

  async createJobTypeDetail(createJobTypeDetailDto: CreateJobTypeDetailDto): Promise<ResponseDto> {
    try {
      const { name } = createJobTypeDetailDto;
  
      const newJobTypeDetail = await this.prisma.jobTypeDetails.create({
        data: {
          name,
        },
      });
  
      return {
        message: 'Tạo JobTypeDetail thành công',
        content: [{
          id: newJobTypeDetail.id,
          name: newJobTypeDetail.name,
          image: null,
          job_type_id: null,
          jobDetail: [],
        }],
      };
    } catch (error) {
      throw new Error(`Lỗi khi tạo JobTypeDetail: ${error.message}`);
    }
  }

  async updateJobTypeDetail(updateJobTypeDetailDto: UpdateJobTypeDetailDto): Promise<ResponseDto> {
    try {
      const { id, job_type_id } = updateJobTypeDetailDto;
  
      const updatedJobTypeDetail = await this.prisma.jobTypeDetails.update({
        where: { id },
        data: { job_type_id },
      });
  
      return {
        message: 'Cập nhật JobTypeDetail thành công',
        content: [{
          id: updatedJobTypeDetail.id,
          name: updatedJobTypeDetail.name,
          image: updatedJobTypeDetail.image,
          job_type_id: updatedJobTypeDetail.job_type_id,
          jobDetail: [],
        }],
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật JobTypeDetail: ${error.message}`);
    }
  }

  async updateJobTypeDetailJobDetail(updateDto: UpdateJobTypeDetailJobDetailDto): Promise<ResponseDto> {
    try {
      const { id, jobDetail } = updateDto;
  
      // Xóa tất cả jobDetail hiện tại
      await this.prisma.jobDetail.deleteMany({
        where: { job_type_detail_id: id },
      });
  
      // Tạo mới các jobDetail
      for (const detail of jobDetail) {
        const newDetail = await this.prisma.detail.create({
          data: { detail_name: detail.detail_name },
        });
  
        await this.prisma.jobDetail.create({
          data: {
            job_type_detail_id: id,
            detail_id: newDetail.id,
          },
        });
      }
  
      // Lấy JobTypeDetail đã cập nhật
      const updatedJobTypeDetail = await this.prisma.jobTypeDetails.findUnique({
        where: { id },
        include: {
          jobDetail: {
            include: {
              detail: true,
            },
          },
        },
      });
  
      return {
        message: 'Cập nhật JobDetail của JobTypeDetail thành công',
        content: [{
          id: updatedJobTypeDetail.id,
          name: updatedJobTypeDetail.name,
          image: updatedJobTypeDetail.image,
          job_type_id: updatedJobTypeDetail.job_type_id,
          jobDetail: updatedJobTypeDetail.jobDetail.map(jd => ({
            detail_name: jd.detail.detail_name,
          })),
        }],
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật JobDetail của JobTypeDetail: ${error.message}`);
    }
  }

   // Thêm phương thức mới
   async updateJobTypeDetailImage(id: number | string, file: Express.Multer.File): Promise<ResponseDto> {
    try {
      const uploadResult = await this.cloudinaryService.uploadImage(file);
      
      const updatedJobTypeDetail = await this.prisma.jobTypeDetails.update({
        where: { id: parseInt(id.toString(), 10) },
        data: { image: uploadResult.secure_url },
        include: {
          jobDetail: {
            include: {
              detail: true,
            },
          },
        },
      });

      return {
        message: 'Cập nhật ảnh cho JobTypeDetail thành công',
        content: [{
          id: updatedJobTypeDetail.id,
          name: updatedJobTypeDetail.name,
          image: updatedJobTypeDetail.image,
          job_type_id: updatedJobTypeDetail.job_type_id,
          jobDetail: updatedJobTypeDetail.jobDetail.map(jd => ({
            detail_name: jd.detail.detail_name,
          })),
        }],
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật ảnh cho JobTypeDetail: ${error.message}`);
    }
  }

  async deleteJobDetail(deleteDto: DeleteJobDetailDto): Promise<ResponseDto> {
    const { jobTypeDetailId, detailId } = deleteDto;
  
    // Kiểm tra sự tồn tại của JobTypeDetail
    const jobTypeDetail = await this.prisma.jobTypeDetails.findUnique({
      where: { id: jobTypeDetailId },
    });
  
    if (!jobTypeDetail) {
      return {
        message: 'JobTypeDetail không tồn tại',
        content: [],
      };
    }
  
    // Kiểm tra sự tồn tại của Detail
    const detail = await this.prisma.detail.findUnique({
      where: { id: detailId },
    });
  
    if (!detail) {
      return {
        message: 'Detail không tồn tại',
        content: [],
      };
    }
  
    // Xóa JobDetail
    const deletedJobDetail = await this.prisma.jobDetail.deleteMany({
      where: {
        job_type_detail_id: jobTypeDetailId,
        detail_id: detailId,
      },
    });
  
    if (deletedJobDetail.count === 0) {
      return {
        message: 'Không tìm thấy JobDetail để xóa',
        content: [],
      };
    }
  
    // Xóa Detail nếu không còn JobDetail nào liên kết với nó
    const remainingJobDetails = await this.prisma.jobDetail.findFirst({
      where: {
        detail_id: detailId,
      },
    });
  
    if (!remainingJobDetails) {
      await this.prisma.detail.delete({
        where: {
          id: detailId,
        },
      });
    }
  
    // Lấy JobTypeDetail đã cập nhật
    const updatedJobTypeDetail = await this.prisma.jobTypeDetails.findUnique({
      where: { id: jobTypeDetailId },
      include: {
        jobDetail: {
          include: {
            detail: true,
          },
        },
      },
    });
  
    return {
      message: 'Xóa JobDetail thành công',
      content: [{
        id: updatedJobTypeDetail.id,
        name: updatedJobTypeDetail.name,
        image: updatedJobTypeDetail.image,
        job_type_id: updatedJobTypeDetail.job_type_id,
        jobDetail: updatedJobTypeDetail.jobDetail.map(jd => ({
          detail_name: jd.detail.detail_name,
        })),
      }],
    };
  }
}

