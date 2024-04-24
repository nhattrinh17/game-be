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

@Module({
  imports: [SequelizeModule.forFeature([UserPointModel, UserModel]), UserModule, GamePointModule],
  controllers: [UserPointController],
  providers: [
    UserPointService,
    {
      provide: 'UserPointRepositoryInterface',
      useClass: UserPointRepository,
    },
    GamePointService,
    RedisService,
  ],
  exports: [
    {
      provide: 'UserPointRepositoryInterface',
      useClass: UserPointRepository,
    },
  ],
})
export class UserPointModule {}
