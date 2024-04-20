import { ApiProperty } from '@nestjs/swagger';

export class CreateGamePointDto {
  @ApiProperty({ name: 'name', type: String, required: true })
  name: string;

  @ApiProperty({ name: 'desc', type: String, required: true })
  desc: string;

  @ApiProperty({ name: 'type', type: Number, required: true })
  type: number;

  @ApiProperty({ name: 'group', type: String, required: true })
  group: string;
}
