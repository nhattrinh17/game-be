import { ApiProperty } from '@nestjs/swagger';

export class UpdatePaymentDto {
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
}

export class AddOrRemoveBankInPayment {
  @ApiProperty({ name: 'bank', type: Number, description: 'Id bản ghi ngân hàng' })
  bank: number;
}
