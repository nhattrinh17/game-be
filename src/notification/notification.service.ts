import { Injectable, Inject } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { NotificationRepositoryInterface } from './interfaces/notification.interface';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class NotificationService {
  constructor(
    @Inject('NotificationRepositoryInterface')
    private readonly notificationRepository: NotificationRepositoryInterface,
  ) {}

  create(dto: CreateNotificationDto) {
    if (!dto.type || !dto.title || !dto.content || !dto.timePublish) throw new Error(messageResponse.system.missingData);
    return this.notificationRepository.create(dto);
  }

  findAll(type: string, maxTimePublish: string, pagination: Pagination, sort?: string, typeSort?: string) {
    const condition: any = {};
    if (type) condition.type = type;
    if (maxTimePublish)
      condition.timePublish = {
        [Op.lte]: maxTimePublish,
      };
    return this.notificationRepository.findAll(condition, { projection: ['id', 'title', 'content', 'timePublish', 'kind', 'type'], sort, typeSort, offset: pagination.offset, limit: pagination.limit });
  }

  findOne(id: number) {
    return this.notificationRepository.findOneById(id, ['id', 'title', 'content', 'timePublish', 'kind', 'type']);
  }

  async update(id: number, dto: UpdateNotificationDto) {
    const update = await this.notificationRepository.findByIdAndUpdate(id, dto);
    if (!update) throw new Error(messageResponse.system.notFound);
    return update;
  }

  async remove(id: number) {
    const deleteItem = await this.notificationRepository.softDelete(id);
    if (!deleteItem) throw new Error(messageResponse.system.notFound);
    return deleteItem;
  }
}
