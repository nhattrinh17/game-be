import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanksModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';

@Injectable()
export class GameTypeRepository extends BaseRepositoryAbstract<BanksModel> implements BaseRepositoryInterface<BanksModel> {
  constructor(@InjectModel(BanksModel) private readonly bankModel: typeof BanksModel) {
    super(bankModel);
  }
}
