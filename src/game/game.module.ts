import { Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameModel, GamePointModel } from 'src/model';
import { GamePointService } from 'src/game-point/game-point.service';
import { GameTypeService } from 'src/game-type/game-type.service';
import { GameRepository } from './repository/game.repository';
import { GamePointRepository } from 'src/game-point/repository/game-point.repository';
import { GamePointModule } from 'src/game-point/game-point.module';
import { GameTypeRepository } from 'src/game-type/game-type.repository';
import { GameTypeModule } from 'src/game-type/game-type.module';
import { RedisModule } from 'src/cache/redis.module';

@Module({
  imports: [SequelizeModule.forFeature([GameModel]), GamePointModule, GameTypeModule, RedisModule],
  controllers: [GameController],
  providers: [
    GameService,
    {
      provide: 'GameRepositoryInterface',
      useClass: GameRepository,
    },
    GamePointService,
    GameTypeService,
  ],
})
export class GameModule {}
