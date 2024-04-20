import { ApiProperty } from '@nestjs/swagger';

export class CreateGameDto {
  @ApiProperty({ name: 'name', type: String })
  name: string;

  @ApiProperty({ name: 'status', type: String })
  status: string;

  @ApiProperty({ name: 'gameTypeId', type: Number })
  gameTypeId: number;

  @ApiProperty({ name: 'gamePointId', type: Number })
  gamePointId: number;
}
