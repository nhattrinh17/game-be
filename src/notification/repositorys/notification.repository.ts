import { NotificationModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base';
import { NotificationRepositoryInterface } from '../interfaces/notification.interface';
import { InjectModel } from '@nestjs/sequelize';

export class NotificationRepository extends BaseRepositoryAbstract<NotificationModel> implements NotificationRepositoryInterface {
  constructor(
    @InjectModel(NotificationModel)
    private readonly notificationModel: typeof NotificationModel,
  ) {
    super(notificationModel);
  }
}
