import { Body, Controller, Delete, Get, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobDetailService } from './job-detail.service';
import {  CreateJobTypeDetailDto, DeleteJobDetailDto, ResponseDto, UpdateJobTypeDetailDto, UpdateJobTypeDetailImageDto, UpdateJobTypeDetailJobDetailDto } from './dto/job-detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';



@ApiTags('job-detail')
@Controller('job-detail')
export class JobDetailController {
  constructor(private readonly jobDetailService: JobDetailService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách JobTypeDetails' })
  @ApiResponse({ status: 200, description: 'Thành công', type: ResponseDto })
  async getJobTypeDetails(): Promise<ResponseDto> {
    return this.jobDetailService.getJobTypeDetails();
  }

  @Post()
@ApiOperation({ summary: 'Tạo JobTypeDetail mới' })
@ApiResponse({ status: 201, description: 'Tạo thành công', type: ResponseDto })
async createJobTypeDetail(@Body() createJobTypeDetailDto: CreateJobTypeDetailDto): Promise<ResponseDto> {
  return this.jobDetailService.createJobTypeDetail(createJobTypeDetailDto);
}

@Put()
@ApiOperation({ summary: 'Cập nhật JobTypeDetail' })
@ApiResponse({ status: 200, description: 'Cập nhật thành công', type: ResponseDto })
async updateJobTypeDetail(@Body() updateJobTypeDetailDto: UpdateJobTypeDetailDto): Promise<ResponseDto> {
  return this.jobDetailService.updateJobTypeDetail(updateJobTypeDetailDto);
}

@Put('job-detail')
@ApiOperation({ summary: 'Cập nhật JobDetail của JobTypeDetail' })
@ApiResponse({ status: 200, description: 'Cập nhật thành công', type: ResponseDto })
async updateJobTypeDetailJobDetail(@Body() updateDto: UpdateJobTypeDetailJobDetailDto): Promise<ResponseDto> {
  return this.jobDetailService.updateJobTypeDetailJobDetail(updateDto);
}

 // Thêm phương thức mới
 @Put('update-image')
 @ApiOperation({ summary: 'Cập nhật ảnh cho JobTypeDetail' })
 @ApiResponse({ status: 200, description: 'Cập nhật ảnh thành công', type: ResponseDto })
 @ApiConsumes('multipart/form-data')
 @UseInterceptors(FileInterceptor('image'))
 async updateJobTypeDetailImage(
   @UploadedFile() file: Express.Multer.File,
   @Body() updateDto: UpdateJobTypeDetailImageDto
 ): Promise<ResponseDto> {
  return this.jobDetailService.updateJobTypeDetailImage(parseInt(updateDto.id.toString(), 10), file); }

  @Delete('job-detail')
@ApiOperation({ summary: 'Xóa JobDetail của JobTypeDetail' })
@ApiResponse({ status: 200, description: 'Xóa thành công', type: ResponseDto })
async deleteJobDetail(@Body() deleteDto: DeleteJobDetailDto): Promise<ResponseDto> {
  return this.jobDetailService.deleteJobDetail(deleteDto);
}
}