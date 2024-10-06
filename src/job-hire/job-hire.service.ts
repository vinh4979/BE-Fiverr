import { Injectable } from '@nestjs/common';
import { CreateJobHireDto, JobHireResponseDto } from './dto/create-job-hire.dto';
import { PrismaService } from 'prisma/prismaService';
import { CompleteJobHireDto, CompleteJobHireResponseDto } from './dto/complete-job-hire.dto';
import { GetJobHireDto, JobHireListResponseDto } from './dto/get-job-hire.dto';

@Injectable()
export class JobHireService {

    constructor(private prisma: PrismaService) {}

    async hireJob(createJobHireDto: CreateJobHireDto, userId: number): Promise<JobHireResponseDto> {
        try {
          const job = await this.prisma.jobs.findUnique({
            where: { id: createJobHireDto.job_id },
          });
      
          if (!job) {
            return {
              message: 'Không tìm thấy công việc với ID đã cung cấp',
              content: null,
            };
          }
      
          const jobHire = await this.prisma.jobHires.create({
            data: {
              job_id: createJobHireDto.job_id,
              user_id: userId,
              hire_date: new Date(),
              is_completed: false,
            },
          });
      
          return {
            message: 'Thuê công việc thành công',
            content: jobHire,
          };
        } catch (error) {
          return {
            message: `Lỗi khi thuê công việc: ${error.message}`,
            content: null,
          };
        }
      }

      async completeJob(completeJobHireDto: CompleteJobHireDto, userId: number): Promise<CompleteJobHireResponseDto> {
        try {
          const jobHire = await this.prisma.jobHires.findUnique({
            where: { id: completeJobHireDto.job_hire_id },
          });
      
          if (!jobHire) {
            return {
              message: 'Không tìm thấy công việc đã thuê với ID đã cung cấp',
              content: null,
            };
          }
      
          if (jobHire.user_id !== userId) {
            return {
              message: 'Bạn không có quyền hoàn thành công việc này',
              content: null,
            };
          }
      
          const updatedJobHire = await this.prisma.jobHires.update({
            where: { id: completeJobHireDto.job_hire_id },
            data: { is_completed: true },
          });
      
          return {
            message: 'Hoàn thành công việc thành công',
            content: updatedJobHire,
          };
        } catch (error) {
          return {
            message: `Lỗi khi hoàn thành công việc: ${error.message}`,
            content: null,
          };
        }
      }
    
      async getJobHires(userId: number, getJobHireDto: GetJobHireDto): Promise<JobHireListResponseDto> {
        const page = Number(getJobHireDto.page) || 1;
        const pageSize = Number(getJobHireDto.pageSize) || 10;
        const skip = (page - 1) * pageSize;
      
        try {
          const [jobHires, totalItems] = await Promise.all([
            this.prisma.jobHires.findMany({
              where: { user_id: userId },
              skip,
              take: pageSize,
              orderBy: { hire_date: 'desc' },
            }),
            this.prisma.jobHires.count({ where: { user_id: userId } }),
          ]);
      
          const totalPages = Math.ceil(totalItems / pageSize);
      
          return {
            message: 'Lấy danh sách công việc đã thuê thành công',
            content: jobHires,
            totalItems,
            totalPages,
            currentPage: page,
          };
        } catch (error) {
          throw new Error(`Lỗi khi lấy danh sách công việc đã thuê: ${error.message}`);
        }
      }

      async getJobHireById(jobHireId: number, userId: number): Promise<JobHireResponseDto> {
        try {
          const jobHire = await this.prisma.jobHires.findUnique({
            where: { id: jobHireId },
            include: { Jobs: true },
          });
      
          if (!jobHire) {
            return {
              message: 'Không tìm thấy công việc đã thuê với ID đã cung cấp',
              content: null,
            };
          }
      
          if (jobHire.user_id !== userId) {
            return {
              message: 'Bạn không có quyền xem thông tin này',
              content: null,
            };
          }
      
          return {
            message: 'Lấy thông tin công việc đã thuê thành công',
            content: jobHire,
          };
        } catch (error) {
          throw new Error(`Lỗi khi lấy thông tin công việc đã thuê: ${error.message}`);
        }
      }
    
      async deleteJobHire(jobHireId: number, userId: number): Promise<{ message: string }> {
        try {
          const jobHire = await this.prisma.jobHires.findUnique({
            where: { id: jobHireId },
          });
      
          if (!jobHire) {
            return { message: 'Không tìm thấy công việc đã thuê với ID đã cung cấp' };
          }
      
          if (jobHire.user_id !== userId) {
            return { message: 'Bạn không có quyền xóa công việc này' };
          }
      
          await this.prisma.jobHires.delete({
            where: { id: jobHireId },
          });
      
          return { message: 'Xóa công việc đã thuê thành công' };
        } catch (error) {
          return { message: `Lỗi khi xóa công việc đã thuê: ${error.message}` };
        }
      }
}
