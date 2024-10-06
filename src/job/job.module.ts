import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { CloudinaryModule } from 'src/cloundinary/cloundinary.module';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer-config';
import { JwtStrategy } from 'src/config/jwt.strategy';
import { JwtConfigModule } from 'src/config/jwt.module';

@Module({
  imports: [
    CloudinaryModule, 
    MulterModule.register(multerOptions),
    JwtConfigModule
  ],
  controllers: [JobController],
  providers: [JobService, JwtStrategy],
})
export class JobModule {}