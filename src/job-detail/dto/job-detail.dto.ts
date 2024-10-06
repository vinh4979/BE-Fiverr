import { ApiProperty } from '@nestjs/swagger';

export class DetailDto {
    @ApiProperty({ example: 'Detail 1', description: 'Tên của chi tiết' })
    detail_name: string;
  }
  
  export class JobTypeDetailDto {
    @ApiProperty({ example: 13, description: 'ID của job type detail' })
    id: number;
  
    @ApiProperty({ example: 'Logo Design', description: 'Tên của job type detail' })
    name: string;
  
    @ApiProperty({ example: 'https://fiverrnew.cybersoft.edu.vn/images/lcv1.jpg', description: 'Đường dẫn ảnh' })
    image: string;
  
    @ApiProperty({ example: 4, description: 'ID của job type' })
    job_type_id: number;
  
    @ApiProperty({ type: [DetailDto], description: 'Danh sách chi tiết' })
    jobDetail: DetailDto[];
  }

export class JobDetailDto {
  @ApiProperty({ example: 1, description: 'ID của job detail' })
  id: number;

  @ApiProperty({ example: 13, description: 'ID của job type detail' })
  job_type_detail_id: number;

  @ApiProperty({ example: 1, description: 'ID của chi tiết' })
  detail_id: number;

  @ApiProperty({ type: DetailDto, description: 'Chi tiết của job' })
  detail: DetailDto;
}



export class ResponseDto {
  @ApiProperty({ example: 'Lấy danh sách JobTypeDetails thành công', description: 'Thông báo kết quả' })
  message: string;

  @ApiProperty({ type: [JobTypeDetailDto], description: 'Dữ liệu trả về' })
  content: JobTypeDetailDto[];
}

export class CreateJobTypeDetailDto {
    @ApiProperty({ example: 'Logo Design', description: 'Tên của job type detail' })
    name: string;
  }


  export class UpdateJobTypeDetailDto {
    @ApiProperty({ example: 1, description: 'ID của JobTypeDetail cần cập nhật' })
    id: number;
  
    @ApiProperty({ example: 1, description: 'ID của JobType mới' })
    job_type_id: number;
  }

  export class UpdateJobTypeDetailJobDetailDto {
    @ApiProperty({ example: 1, description: 'ID của JobTypeDetail cần cập nhật' })
    id: number;
  
    @ApiProperty({ type: [DetailDto], description: 'Danh sách chi tiết mới' })
    jobDetail: DetailDto[];
  }

 

  export class UpdateJobTypeDetailImageDto {
    @ApiProperty({ example: 1, description: 'ID của JobTypeDetail cần cập nhật' })
    id: number;
  
    @ApiProperty({ type: 'string', format: 'binary', description: 'File ảnh mới' })
    image: any;
  }

  export class DeleteJobDetailDto {
    @ApiProperty({ example: 1, description: 'ID của JobTypeDetail' })
    jobTypeDetailId: number;
  
    @ApiProperty({ example: 1, description: 'ID của Detail cần xóa' })
    detailId: number;
  }
