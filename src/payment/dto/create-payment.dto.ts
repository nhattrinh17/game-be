import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ name: 'paymentTypeId', type: Number, description: 'Id kiểu phương thức thanh toán' })
  paymentTypeId: number;

  @ApiProperty({ name: 'name', type: String, description: 'Tên hiển thị trên phương thức' })
  methodName: string;

  @ApiProperty({ name: 'image', type: String, description: 'Ảnh hiển thị trên phương thức' })
  methodImage: string;

  @ApiProperty({ name: 'nameWarning', type: String, description: 'Thông báo cảnh báo' })
  nameWarning: string;

  @ApiProperty({ name: 'status', type: String, description: 'Thông báo cảnh báo' })
  status: string;

  @ApiProperty({ name: 'minimum', type: Number, description: 'Số tiền tối thiểu' })
  minimum: number;

  @ApiProperty({ name: 'maximum', type: Number, description: 'Số tiền tối đa' })
  maximum: number;

  @ApiProperty({ name: 'bankIds', type: [Number], description: 'Danh sách ngân hàng' })
  bankIds: number[];
}
