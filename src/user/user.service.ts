import { Injectable, ConflictException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/auth/dto/create-auth.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { Users_gender, Users_role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { CloudinaryService } from 'src/cloundinary/cloudinary.service';

@Injectable()
export class UserService {
  constructor(
     private prismaService: PrismaService,
     private jwtService: JwtService, 
     private cloudinaryService: CloudinaryService) {}

  async getUser() : Promise<User[]> {
    return this.prismaService.users.findMany()
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const existingUser = await this.prismaService.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.prismaService.users.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role as Users_role,
        gender: createUserDto.gender as Users_gender, 
        skill: createUserDto.skill?.join(',') || '', 
        certification: createUserDto.certification?.join(',') || ''
      },
    });

    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<{ message: string, accessToken: string }> {
    const user = await this.prismaService.users.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user || !(await bcrypt.compare(loginUserDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(payload);

    return {message: "Login sucessfully!",  accessToken };
  }



  
    


  private getPublicIdFromUrl(url: string): string {
    const parts = url.split('/');
    const filename = parts[parts.length - 1];
    return filename.split('.')[0];
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto, file?: Express.Multer.File): Promise<{ message: string; content: User }> {
    try {
      const existingUser = await this.prismaService.users.findUnique({
        where: { id: userId },
      });
  
      if (!existingUser) {
        throw new NotFoundException('Người dùng không tồn tại');
      }
  
      const updateData: any = {};
  
      if (updateUserDto.name) updateData.name = updateUserDto.name;
      if (updateUserDto.email) updateData.email = updateUserDto.email;
      if (updateUserDto.phone) updateData.phone = updateUserDto.phone;
      if (updateUserDto.birth_day) updateData.birth_day = updateUserDto.birth_day;
      if (updateUserDto.gender) updateData.gender = updateUserDto.gender;
      if (updateUserDto.skill) {
        updateData.skill = Array.isArray(updateUserDto.skill) 
          ? updateUserDto.skill.join(',') 
          : updateUserDto.skill;
      }
      if (updateUserDto.certification) {
        updateData.certification = Array.isArray(updateUserDto.certification)
          ? updateUserDto.certification.join(',')
          : updateUserDto.certification;
      }
  
      if (file) {
        // Xóa ảnh cũ nếu có
        if (existingUser.avatar) {
          const publicId = this.getPublicIdFromUrl(existingUser.avatar);
          await this.cloudinaryService.deleteImage(publicId);
        }
  
        // Upload ảnh mới
        const uploadResult = await this.cloudinaryService.uploadImage(file);
        updateData.avatar = uploadResult.secure_url;
      }
  
      const updatedUser = await this.prismaService.users.update({
        where: { id: userId },
        data: updateData,
      });
  
      return {
        message: 'Cập nhật thông tin người dùng thành công',
        content: updatedUser,
      };
    } catch (error) {
      throw new Error(`Lỗi khi cập nhật thông tin người dùng: ${error.message}`);
    }
  }

  async getUserById(userId: number): Promise<{ message: string; content: User }> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        throw new NotFoundException('Người dùng không tồn tại');
      }
  
      return {
        message: 'Lấy thông tin người dùng thành công',
        content: user,
      };
    } catch (error) {
      throw new Error(`Lỗi khi lấy thông tin người dùng: ${error.message}`);
    }
  }


  async searchUsers(searchTerm: string): Promise<User[]> {
    const lowercaseSearchTerm = searchTerm.toLowerCase();
    return this.prismaService.users.findMany({
      where: {
        OR: [
          { email: { contains: lowercaseSearchTerm } },
          { name: { contains: lowercaseSearchTerm } },
        ],
      },
    });
  }

  async deleteUser(userId: number): Promise<{ message: string }> {
    try {
      const user = await this.prismaService.users.findUnique({
        where: { id: userId },
      });
  
      if (!user) {
        throw new NotFoundException('Người dùng không tồn tại');
      }
  
      await this.prismaService.users.delete({
        where: { id: userId },
      });
  
      return {
        message: 'Xóa người dùng thành công',
      };
    } catch (error) {
      throw new Error(`Lỗi khi xóa người dùng: ${error.message}`);
    }
  }
}




