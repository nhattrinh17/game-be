import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BanksModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { BankRepositoryInterface } from './bank.interface';

@Injectable()
export class BankRepository extends BaseRepositoryAbstract<BanksModel> implements BankRepositoryInterface {
  constructor(@InjectModel(BanksModel) private readonly bankModel: typeof BanksModel) {
    super(bankModel);
  }
}
