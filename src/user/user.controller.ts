import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile , Request, ParseIntPipe, Query, UnauthorizedException} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/config/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@ApiBearerAuth('access-token')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users', type: [User] })
  async getAllUser(): Promise<{ statusCode: number; content: User[]; dateTime: string }> {
    const users = await this.userService.getUser()
    return {
      statusCode: 200,
      content: users,
      dateTime: new Date().toISOString(),
    };
  }

  @Patch()
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiConsumes('multipart/form-data')
@ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
@ApiResponse({ status: 200, description: 'Cập nhật thành công' })
@UseInterceptors(FileInterceptor('avatar'))
async updateUser(
  @Request() req,
  @Body() updateUserDto: UpdateUserDto,
  @UploadedFile() file: Express.Multer.File
): Promise<{ message: string; content: User }> {
  const userId = req.user.id;
  return this.userService.updateUser(userId, updateUserDto, file);
}

@Get('search')
@ApiOperation({ summary: 'Tìm kiếm người dùng theo email hoặc tên' })
@ApiResponse({ status: 200, description: 'Tìm kiếm thành công' })
@ApiQuery({ name: 'term', required: true, type: String })
async searchUsers(@Query('term') searchTerm: string): Promise<{ message: string; content: User[] }> {
  const users = await this.userService.searchUsers(searchTerm);
  return {
    message: 'Tìm kiếm người dùng thành công',
    content: users,
  };
}


@Get(':id')
// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth()
@ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
@ApiResponse({ status: 200, description: 'Lấy thông tin thành công' })
async getUserById(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; content: User }> {
  return this.userService.getUserById(id);
}


@Delete(':id')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiOperation({ summary: 'Xóa người dùng' })
@ApiResponse({ status: 200, description: 'Xóa thành công' })
async deleteUser(
  @Param('id', ParseIntPipe) id: number,
  @Request() req
): Promise<{ message: string }> {
  const userId = req.user.id;
  if (userId !== id) {
    throw new UnauthorizedException('Bạn không có quyền xóa người dùng này');
  }
  return this.userService.deleteUser(id);
}


  
}
