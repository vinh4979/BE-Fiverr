import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CloudinaryModule } from 'src/cloundinary/cloundinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer-config';
import { JwtConfigModule } from 'src/config/jwt.module';
import { JwtStrategy } from 'src/config/jwt.strategy';

@Module({
  imports: [CloudinaryModule, MulterModule.register(multerOptions), JwtConfigModule],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
