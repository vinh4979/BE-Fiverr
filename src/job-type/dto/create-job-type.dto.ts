import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateJobTypeDto {
  @ApiProperty({ description: 'Tên loại công việc' })
  @IsString()
  name: string;
}