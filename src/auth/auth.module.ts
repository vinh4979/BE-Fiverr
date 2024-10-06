import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtConfigModule } from 'src/config/jwt.module';
import { JwtStrategy } from 'src/config/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}