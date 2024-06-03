import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGiftCodeDto } from './create-gift-code.dto';

export class UpdateGiftCodeDto {
  @ApiProperty({ name: 'status', type: Number, description: 'Trạng thái' })
  status: number;

  @ApiProperty({ name: 'userIdUse', type: Number, description: 'User nhận' })
  userIdUse: number;
}
