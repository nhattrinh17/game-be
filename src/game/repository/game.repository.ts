import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GameModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { GameRepositoryInterface } from '../interface/game.interface';

@Injectable()
export class GameRepository extends BaseRepositoryAbstract<GameModel> implements GameRepositoryInterface {
  constructor(@InjectModel(GameModel) private readonly gameModel: typeof GameModel) {
    super(GameModel);
  }
}
