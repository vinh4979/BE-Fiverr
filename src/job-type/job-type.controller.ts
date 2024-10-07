import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';

@ApiTags('job-type')
@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tạp jobType mới' })
  create(@Body() createJobTypeDto: CreateJobTypeDto) {
    return this.jobTypeService.create(createJobTypeDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách jobType' })
  findAll() {
    return this.jobTypeService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy danh sách jobType theo ID người dùng' })
  findOne(@Param('id') id: string) {
    return this.jobTypeService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'cập nhật jobTyoe' })
  update(@Param('id') id: string, @Body() updateJobTypeDto: CreateJobTypeDto) {
    return this.jobTypeService.update(+id, updateJobTypeDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xoá jobType' })
  remove(@Param('id') id: string) {
    return this.jobTypeService.remove(+id);
  }
}