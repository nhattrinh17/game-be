import { BanksModel, GameTypeModel } from 'src/model';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';

export interface BankRepositoryInterface extends BaseRepositoryInterface<BanksModel> {}
