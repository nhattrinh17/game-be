import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentTypeDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên cổng thanh toán' })
  name: string;

  @ApiProperty({ name: 'image', type: String, description: 'Ảnh hiển thị' })
  image: string;

  @ApiProperty({ name: 'minimum', type: Number, description: 'Số tiền tối thiếu' })
  minimum: number;

  @ApiProperty({ name: 'maximum', type: Number, description: 'Tên tiền tối đa' })
  maximum: number;
}
