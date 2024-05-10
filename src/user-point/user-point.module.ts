import { Module } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { UserPointController } from './user-point.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel, UserPointModel } from 'src/model';
import { UserPointRepository } from './repository/user-point.repository';
import { UserModule } from 'src/user/user.module';
import { GamePointModule } from 'src/game-point/game-point.module';
import { GamePointService } from 'src/game-point/game-point.service';
import { RedisService } from 'src/cache/redis.service';
import { HistoryTransferPointModel } from 'src/model/history-transfer-point.model';
import { HistoryTransferPointRepository } from './repository/history-transfer-point.repository';

@Module({
  imports: [SequelizeModule.forFeature([UserPointModel, UserModel, HistoryTransferPointModel]), UserModule, GamePointModule],
  controllers: [UserPointController],
  providers: [
    UserPointService,
    {
      provide: 'UserPointRepositoryInterface',
      useClass: UserPointRepository,
    },
    {
      provide: 'HistoryTransferPointInterface',
      useClass: HistoryTransferPointRepository,
    },
    RedisService,
    GamePointService,
  ],
  exports: [
    UserPointService,
    {
      provide: 'UserPointRepositoryInterface',
      useClass: UserPointRepository,
    },
    {
      provide: 'HistoryTransferPointInterface',
      useClass: HistoryTransferPointRepository,
    },
  ],
})
export class UserPointModule {}
