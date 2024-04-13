import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGameTypeDto {
  @IsString()
  @ApiProperty({ name: 'name', description: 'Tên loại ganme', required: true })
  name: string;

  @ApiProperty({ name: 'slug', description: 'slug' })
  slug: string;
}
