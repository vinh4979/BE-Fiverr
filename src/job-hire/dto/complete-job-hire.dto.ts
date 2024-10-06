import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompleteJobHireDto {
  @ApiProperty({ description: 'ID của công việc đã thuê cần hoàn thành' })
  @IsNotEmpty()
  @IsNumber()
  job_hire_id: number;
}

export interface CompleteJobHireResponseDto {
  message: string;
  content: {
    id: number;
    job_id: number;
    user_id: number;
    hire_date: Date;
    is_completed: boolean;
  } | null;
}