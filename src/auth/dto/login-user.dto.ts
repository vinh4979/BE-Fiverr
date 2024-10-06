import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ description: 'Email người dùng' })
  @IsString()
  email: string;

  @ApiProperty({ description: 'Mật khẩu người dùng' })
  @IsString()
  password: string;
}