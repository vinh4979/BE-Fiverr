import { Controller, Post, Body, UseGuards, Request, Patch, Get, Query, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { JobHireService } from './job-hire.service';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateJobHireDto, JobHireResponseDto } from './dto/create-job-hire.dto';
import { CompleteJobHireDto, CompleteJobHireResponseDto } from './dto/complete-job-hire.dto';
import { GetJobHireDto, JobHireListResponseDto } from './dto/get-job-hire.dto';

@ApiTags('job-hire')
@ApiBearerAuth('access-token')
@Controller('job-hire')
export class JobHireController {
  constructor(private readonly jobHireService: JobHireService) {}

  @Get()
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Lấy danh sách công việc đã thuê' })
@ApiResponse({ status: 200, description: 'Lấy danh sách thành công' })
async getJobHires(
  @Request() req,
  @Query() getJobHireDto: GetJobHireDto
): Promise<JobHireListResponseDto> {
  const userId = req.user.id;
  return this.jobHireService.getJobHires(userId, getJobHireDto);
}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Thuê công việc' })
  @ApiResponse({ status: 201, description: 'Thuê công việc thành công' })
  async hireJob(
    @Body() createJobHireDto: CreateJobHireDto,
    @Request() req
  ): Promise<JobHireResponseDto> {
    const userId = req.user.id;
    return this.jobHireService.hireJob(createJobHireDto, userId);
  }

  @Patch('complete')
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Hoàn thành công việc đã thuê' })
@ApiResponse({ status: 200, description: 'Hoàn thành công việc thành công' })
async completeJob(
  @Body() completeJobHireDto: CompleteJobHireDto,
  @Request() req
): Promise<CompleteJobHireResponseDto> {
  const userId = req.user.id;
  return this.jobHireService.completeJob(completeJobHireDto, userId);
}

@Get(':id')
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Lấy thông tin công việc đã thuê theo ID' })
@ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
async getJobHireById(
  @Param('id', ParseIntPipe) id: number,
  @Request() req
): Promise<JobHireResponseDto> {
  const userId = req.user.id;
  return this.jobHireService.getJobHireById(id, userId);
}


@Delete(':id')
@UseGuards(JwtAuthGuard)
@ApiOperation({ summary: 'Xóa công việc đã thuê' })
@ApiResponse({ status: 200, description: 'Xóa thành công' })
async deleteJobHire(
  @Param('id', ParseIntPipe) id: number,
  @Request() req
): Promise<{ message: string }> {
  const userId = req.user.id;
  return this.jobHireService.deleteJobHire(id, userId);
}


}