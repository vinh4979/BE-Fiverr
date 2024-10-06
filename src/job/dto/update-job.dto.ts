import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateJobDto {
    @ApiProperty({ description: 'ID của công việc cần cập nhật' })
    @IsNumber()
    @Type(() => Number)
    id: number;

  @ApiProperty({ description: 'Tên công việc', required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ description: 'Giá công việc', required: false })
  @IsOptional()
  @IsNumber()
  price?: number;

  @ApiProperty({ description: 'Mô tả ngắn', required: false })
  @IsOptional()
  @IsString()
  short_description?: string;

  @ApiProperty({ description: 'Mô tả chi tiết', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'ID của JobTypeDetail', required: false })
  @IsOptional()
  @IsNumber()
  job_type_detail_id?: number;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Ảnh công việc', required: false })
  @IsOptional()
  image?: any;
}

export interface UpdateJobResponse {
  message: string;
  content: any;
}