import { ApiProperty } from '@nestjs/swagger';

export class CreateBankDto {
  @ApiProperty({ name: 'nameBank', description: 'Tên ngân hàng', type: String })
  nameBank: string;

  @ApiProperty({ name: 'nameBank', description: 'Tên ngân hàng', type: Number })
  binBank: number;

  @ApiProperty({ name: 'branch', description: 'Tên chi nhánh', type: String })
  branch: string;

  @ApiProperty({ name: 'accountOwner', description: 'Tên chủ tài khoản', type: String })
  accountOwner: string;

  @ApiProperty({ name: 'accountNumber', description: 'Số tài khoản', type: String })
  accountNumber: string;
}
