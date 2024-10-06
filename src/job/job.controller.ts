import { Controller, Post, Body, UseInterceptors, UploadedFile, Request, UseGuards, Get, Patch, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobService } from './job.service';
import { CreateJobDto, JobListResponseDto } from './dto/create-job.dto';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';
import { UpdateJobDto, UpdateJobResponse } from './dto/update-job.dto';

@ApiTags('jobs')
@ApiBearerAuth('access-token')
@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  async findAll() {
    return this.jobService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạo công việc mới' })
  @ApiResponse({ status: 201, description: 'Tạo thành công' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  async createJob(
    @Body() createJobDto: CreateJobDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req
  ): Promise<{ message: string; content: any }> {
    const creatorId = req.user.id;
    return this.jobService.createJob(createJobDto, file, creatorId);
  }

  // update jobs
  @Patch()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Cập nhật công việc' })
@ApiResponse({ status: 200, description: 'Cập nhật thành công' })
@ApiConsumes('multipart/form-data')
@UseInterceptors(FileInterceptor('image'))
async updateJob(
  @Body() updateJobDto: UpdateJobDto,
  @UploadedFile() file: Express.Multer.File,
  @Request() req
): Promise<UpdateJobResponse> {
  const userId = req.user.id;
  return this.jobService.updateJob(updateJobDto, file, userId);
}

@Delete(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Xóa công việc' })
@ApiResponse({ status: 200, description: 'Xóa thành công' })
async deleteJob(
  @Param('id', ParseIntPipe) id: number,
  @Request() req
): Promise<{ message: string }> {
  const userId = req.user.id;
  return this.jobService.deleteJob(id, userId);
}

@Get(':id')
@ApiOperation({ summary: 'Lấy thông tin công việc theo ID' })
@ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
async getJobById(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; content: any }> {
  return this.jobService.getJobById(id);
}

@Get('type/:typeId')
@ApiOperation({ summary: 'Lấy danh sách công việc theo loại' })
@ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
async findJobsByTypeId(@Param('typeId', ParseIntPipe) typeId: number): Promise<JobListResponseDto> {
  return this.jobService.findJobsByTypeId(typeId);
}
  
}