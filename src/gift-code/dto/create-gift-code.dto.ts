import { ApiProperty } from '@nestjs/swagger';

export class CreateGiftCodeDto {
  @ApiProperty({ name: 'name', type: String, description: 'Tên gift code' })
  name: string;

  @ApiProperty({ name: 'totalCode', type: Number, description: 'Số lượng' })
  totalCode: number;

  @ApiProperty({ name: 'point', type: Number, description: 'Giá trị' })
  point: number;

  @ApiProperty({ name: 'userIdCreate', type: Number, description: 'Người tạo' })
  userIdCreate: number;
}
