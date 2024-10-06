import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional, IsInt, Min } from 'class-validator';
import { Jobs } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateJobDto {
  @ApiProperty({ description: 'Tên công việc' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Giá công việc' })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Mô tả ngắn' })
  @IsOptional()
  @IsString()
  short_description?: string;

  @ApiProperty({ description: 'Mô tả chi tiết' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'ID của JobTypeDetail' })
  @IsNotEmpty()
  @IsNumber()
  job_type_detail_id: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Ảnh công việc' })
  image: any;
  
}

export class JobListResponseDto {
    message: string;
    content: Jobs[];
  }

  export class GetJobsDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
  
    @IsOptional()
    @IsString()
    search?: string;
  }

  

  