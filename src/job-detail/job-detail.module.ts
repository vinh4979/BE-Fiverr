import { Module } from '@nestjs/common';
import { JobDetailService } from './job-detail.service';
import { JobDetailController } from './job-detail.controller';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/utils/multer-config';
import { CloudinaryModule } from 'src/cloundinary/cloundinary.module';

@Module({
  imports: [
    MulterModule.register(multerOptions),
    CloudinaryModule,
  ],
  controllers: [JobDetailController],
  providers: [JobDetailService],
})
export class JobDetailModule {}
