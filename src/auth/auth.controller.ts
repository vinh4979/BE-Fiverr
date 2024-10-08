import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Đăng kí' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  async register(@Body() createAuthDto: CreateUserDto) {
    return this.authService.register(createAuthDto);
  }ApiOperation

  @Post('login')
  @ApiOperation({ summary: 'Đăng nhập' })
  @ApiResponse({ status: 200, description: 'User logged in successfully' })
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
}