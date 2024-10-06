import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-auth.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return this.userService.login(loginUserDto);
  }
}