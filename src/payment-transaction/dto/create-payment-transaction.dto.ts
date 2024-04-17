import { ApiProperty } from '@nestjs/swagger';

export class AddReceiptTranSactionDto {
  @ApiProperty({ name: 'receipt', description: 'Biên lai thanh toán', type: String })
  receipt: string;
}
export class CreatePaymentTransactionDto {
  @ApiProperty({ name: 'paymentId', description: 'Id phương thức thanh toán', type: Number })
  paymentId: number;

  @ApiProperty({ name: 'userId', description: 'Id người dùng thanh toán', type: Number })
  userId: number;

  @ApiProperty({ name: 'bankId', description: 'Id người dùng thanh toán', type: Number })
  bankId: number;

  @ApiProperty({ name: 'type', description: 'Loại giao dịch(nạp or rút)', type: Number })
  type: number;

  @ApiProperty({ name: 'qrCode', description: 'Qr code khi thanh toán', type: Number })
  qrCode?: number;

  @ApiProperty({ name: 'status', description: 'Trạng thái giao dịch', type: Number })
  status?: number;
}
