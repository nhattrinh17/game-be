import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class updateUserWithCms {
  @IsString()
  @ApiProperty({ name: 'phone', description: 'Số điện thoại người dùng', required: true })
  phone: string;

  @ApiProperty({ name: 'status', description: 'Trạng thái' })
  status: string;

  @ApiProperty({ name: 'typeUser', description: 'Loại user' })
  typeUser: string;
}
