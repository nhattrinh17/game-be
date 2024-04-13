import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentTypeDto } from './create-payment-type.dto';

export class UpdatePaymentTypeDto extends PartialType(CreatePaymentTypeDto) {
  @ApiProperty({ name: 'status', type: String, description: 'Trạng thái' })
  status: string;
}
