import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'prisma/prismaModule';
import { AuthModule } from './auth/auth.module';
import { JobTypeModule } from './job-type/job-type.module';
import { JobDetailModule } from './job-detail/job-detail.module';
import { CloudinaryModule } from './cloundinary/cloundinary.module';
import { JobModule } from './job/job.module';
import { JobHireModule } from './job-hire/job-hire.module';
import { CommentModule } from './comment/comment.module';
import { JwtConfigModule } from './config/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule,
    CloudinaryModule,
    UserModule,
    AuthModule,
    JobTypeModule,
    JobDetailModule,
    JobModule,
    JobHireModule,
    CommentModule,
    JwtConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}