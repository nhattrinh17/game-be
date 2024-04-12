import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentTypeModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';
import { PaymentTypeRepositoryInterface } from './payment-type.interface';

@Injectable()
export class PaymentTypeRepository extends BaseRepositoryAbstract<PaymentTypeModel> implements PaymentTypeRepositoryInterface {
  constructor(@InjectModel(PaymentTypeModel) private readonly paymentTypeModel: typeof PaymentTypeModel) {
    super(PaymentTypeModel);
  }
}
