import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';
@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperationCustom('Notification', 'post')
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get()
  @BaseFilter()
  @ApiQuery({
    name: 'type',
    type: String,
  })
  @ApiQuery({
    name: 'maxTimePublish',
    description: 'Thời gian lớn nhất của thông báo',
    type: Date,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiQuery({
    name: 'typeSort',
    type: String,
  })
  @ApiOperationCustom('Notification', 'Get')
  findAll(@Req() req: any, @Query('type') type: string, @Query('maxTimePublish') maxTimePublish: string, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    return this.notificationService.findAll(type, maxTimePublish, req['pagination'], sort, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Notification', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.notificationService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Notification', 'patch')
  update(@Param('id') id: string, @Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(+id, updateNotificationDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Notification', 'delete')
  remove(@Param('id') id: string) {
    return this.notificationService.remove(+id);
  }
}
