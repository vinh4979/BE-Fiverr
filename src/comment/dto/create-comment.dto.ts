import { IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {

  @ApiProperty()
  @IsNumber()
  jobId: number;

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;

}