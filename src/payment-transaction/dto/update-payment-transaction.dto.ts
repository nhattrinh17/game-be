import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentTransactionDto } from './create-payment-transaction.dto';

export class UpdateStatusPaymentTransactionDto {
  @ApiProperty({ name: 'status', description: 'Trạng thái giao dịch', type: Number })
  status?: number;

  @ApiProperty({ name: 'title', description: 'Tiêu đề hiển thị', type: String })
  title?: string;

  @ApiProperty({ name: 'notificationId', description: 'Id thông báo', type: Number })
  notificationId?: number;
}
