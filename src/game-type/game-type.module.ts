import { Module } from '@nestjs/common';
import { GameTypeService } from './game-type.service';
import { GameTypeController } from './game-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GameTypeModel } from 'src/model';
import { GameTypeRepository } from './game-type.repository';

@Module({
  imports: [SequelizeModule.forFeature([GameTypeModel])],
  controllers: [GameTypeController],
  providers: [
    GameTypeService,
    {
      provide: 'GameTypeRepositoryInterface',
      useClass: GameTypeRepository,
    },
  ],
  exports: [
    {
      provide: 'GameTypeRepositoryInterface',
      useClass: GameTypeRepository,
    },
  ],
})
export class GameTypeModule {}
