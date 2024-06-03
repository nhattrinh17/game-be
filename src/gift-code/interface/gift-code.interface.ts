import { GiftCodeModel } from 'src/model';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';

export interface GiftCodeRepositoryInterface extends BaseRepositoryInterface<GiftCodeModel> {
  createBulk(dto: any[]): Promise<any>;
}
