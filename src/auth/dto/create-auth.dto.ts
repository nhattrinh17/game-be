import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateAuthDto {}

export class LoginDto {
  @IsString()
  @ApiProperty({ name: 'account', description: 'username hoặc email' })
  account: string;

  @IsString()
  @ApiProperty({ name: 'password', description: 'password' })
  password: string;

  @ApiProperty({ name: 'BBOSID', description: 'BBOSID' })
  BBOSID: string;

  @ApiProperty({ name: 'isRemember', description: 'isRemember' })
  isRemember: string;
}

export class RefreshTokenDto {
  @IsString()
  @ApiProperty({ name: 'refresh_token', description: 'username hoặc email' })
  refresh_token: string;
}
