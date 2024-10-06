import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateJobHireDto {
  @ApiProperty({ description: 'ID của công việc cần thuê' })
  @IsNotEmpty()
  @IsNumber()
  job_id: number;
}

export interface JobHireResponseDto {
    message: string;
    content: {
      id: number;
      job_id: number;
      user_id: number;
      hire_date: Date;
      is_completed: boolean;
      Jobs?: {
        id: number;
        name: string;
        price: number;
        short_description?: string;
        description?: string;
        image?: string;
        job_type_detail_id: number;
        creator_id: number;
      };
    } | null;
  }