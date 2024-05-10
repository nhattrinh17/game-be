import { Module } from '@nestjs/common';
import { GamePointService } from './game-point.service';
import { GamePointController } from './game-point.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GamePointModel } from 'src/model';
import { GamePointRepository } from './repository/game-point.repository';
import { RedisModule } from 'src/cache/redis.module';
import { RedisService } from 'src/cache/redis.service';

@Module({
  imports: [SequelizeModule.forFeature([GamePointModel]), RedisModule],
  controllers: [GamePointController],
  providers: [
    GamePointService,
    {
      provide: 'GamePointRepositoryInterface',
      useClass: GamePointRepository,
    },
  ],
  exports: [
    {
      provide: 'GamePointRepositoryInterface',
      useClass: GamePointRepository,
    },
    GamePointService,
  ],
})
export class GamePointModule {}
