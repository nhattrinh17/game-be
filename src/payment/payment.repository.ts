import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GameTypeModel } from 'src/model/game-type.model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';

@Injectable()
export class GameTypeRepository extends BaseRepositoryAbstract<GameTypeModel> implements BaseRepositoryInterface<GameTypeModel> {
  constructor(@InjectModel(GameTypeModel) private readonly gameTypeModel: typeof GameTypeModel) {
    super(gameTypeModel);
  }
}
