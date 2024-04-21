import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationModel } from 'src/model';
import { NotificationRepository } from './repositorys/notification.repository';

@Module({
  imports: [SequelizeModule.forFeature([NotificationModel])],
  controllers: [NotificationController],
  providers: [
    NotificationService,
    {
      provide: 'NotificationRepositoryInterface',
      useClass: NotificationRepository,
    },
  ],
  exports: [
    {
      provide: 'NotificationRepositoryInterface',
      useClass: NotificationRepository,
    },
  ],
})
export class NotificationModule {}
