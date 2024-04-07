import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({ name: 'name', description: 'Tên nhóm', type: String, required: true })
  name: string;

  @ApiProperty({ name: 'description', description: 'Quyền nhóm', type: String, required: true })
  description: string;
}
