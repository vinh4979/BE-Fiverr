import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prismaService';
import { CreateJobTypeDto } from './dto/create-job-type.dto';
import { JobTypes } from '@prisma/client';

@Injectable()
export class JobTypeService {
  constructor(private prismaService: PrismaService) {}

  async create(createJobTypeDto: CreateJobTypeDto): Promise<JobTypes> {
    return this.prismaService.jobTypes.create({
      data: createJobTypeDto,
    });
  }

  async findAll(): Promise<JobTypes[]> {
    return this.prismaService.jobTypes.findMany();
  }

  async findOne(id: number): Promise<JobTypes> {
    return this.prismaService.jobTypes.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateJobTypeDto: CreateJobTypeDto): Promise<JobTypes> {
    return this.prismaService.jobTypes.update({
      where: { id },
      data: updateJobTypeDto,
    });
  }

  async remove(id: number): Promise<JobTypes> {
    return this.prismaService.jobTypes.delete({
      where: { id },
    });
  }
}