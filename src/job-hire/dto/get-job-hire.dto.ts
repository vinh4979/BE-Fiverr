import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class GetJobHireDto {
  @ApiProperty({ description: 'Số trang', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ description: 'Số lượng item trên mỗi trang', required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number = 10;
}

export interface JobHireListResponseDto {
  message: string;
  content: {
    id: number;
    job_id: number;
    user_id: number;
    hire_date: Date;
    is_completed: boolean;
  }[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}