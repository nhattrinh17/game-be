import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateGiftCodeDto } from './create-gift-code.dto';

export class UpdateGiftCodeDto {
  @ApiProperty({ name: 'status', type: Number, description: 'Trạng thái' })
  status: number;

  @ApiProperty({ name: 'userIdUse', type: Number, description: 'User nhận' })
  userIdUse: number;
}

export class SubmitGiftCodeDto {
  @ApiProperty({ name: 'code', type: String, description: 'code' })
  code: string;

  @ApiProperty({ name: 'userIdUse', type: Number, description: 'User nhận' })
  userIdUse: number;
}
