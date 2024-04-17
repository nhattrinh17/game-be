import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentDto {
  @ApiProperty({ name: 'paymentTypeId', type: Number, description: 'Id kiểu phương thức thanh toán' })
  paymentTypeId: number;

  @ApiProperty({ name: 'methodName', type: String, description: 'Tên hiển thị trên phương thức' })
  methodName: string;

  @ApiProperty({ name: 'methodImage', type: String, description: 'Ảnh hiển thị trên phương thức' })
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

  @ApiProperty({ name: 'showAccount', type: Boolean, description: 'HIển thị các thông tin tài khoản' })
  showAccount: boolean;

  @ApiProperty({ name: 'type', type: String, description: 'Loại thanh toán' })
  type: string;

  @ApiProperty({ name: 'imagePopup', type: String, description: 'Ảnh khi mở popup thanh toán' })
  imagePopup: string;

  @ApiProperty({ name: 'message', type: String, description: 'Tin nhắn khi không hiển thị popup' })
  message: string;
}
