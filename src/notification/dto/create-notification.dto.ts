import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto {
  @ApiProperty({ name: 'type', description: 'Kiểu thông báo(cá nhân, thông báo(hệ thống)', type: String })
  type: string;

  @ApiProperty({ name: 'kind', description: 'Loại thông báo(thường khi có type là hệ thống)', type: String })
  kind: string;

  @ApiProperty({ name: 'title', description: 'Tiêu đề thông báo', type: String })
  title: string;

  @ApiProperty({ name: 'content', description: 'Nội dung thông báo', type: String })
  content: string;

  @ApiProperty({ name: 'timePublish', description: 'Thời gian công bố', type: Date })
  timePublish: Date;
}
