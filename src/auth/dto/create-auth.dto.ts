import { IsString, IsEmail, IsOptional, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'Tên người dùng' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Email người dùng' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Mật khẩu người dùng' })
  @IsString()
  password: string;

  @ApiProperty({ description: 'Số điện thoại người dùng', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Ngày sinh của người dùng', required: false })
  @IsOptional()
  @IsString()
  birth_day?: string;

  @ApiProperty({ description: 'Giới tính của người dùng', required: false })
  @IsOptional()
  @IsEnum(['male', 'female', 'other'])
  gender?: 'male' | 'female' | 'other';

  @ApiProperty({ description: 'Vai trò của người dùng', required: false })
  @IsOptional()
  @IsEnum(['buyer', 'seller', 'admin', 'moderator'])
  role?: 'buyer' | 'seller' | 'admin' | 'moderator';

  @ApiProperty({ description: 'Kỹ năng của người dùng', type: [String], required: false })
  @IsOptional()
  @IsArray()
  skill?: string[];

  @ApiProperty({ description: 'Chứng chỉ của người dùng', type: [String], required: false })
  @IsOptional()
  @IsArray()
  certification?: string[];
}