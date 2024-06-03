import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GiftCodeModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { GiftCodeRepositoryInterface } from '../interface/gift-code.interface';

@Injectable()
export class GiftCodeRepository extends BaseRepositoryAbstract<GiftCodeModel> implements GiftCodeRepositoryInterface {
  constructor(@InjectModel(GiftCodeModel) private readonly giftCodeModel: typeof GiftCodeModel) {
    super(GiftCodeModel);
  }

  createBulk(dto: any[]): Promise<any> {
    return this.giftCodeModel.bulkCreate(dto);
  }
}
