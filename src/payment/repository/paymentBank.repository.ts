import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentBankModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { PaymentBankRepositoryInterface } from '../interface/paymentBank.interface';

@Injectable()
export class PaymentBankRepository extends BaseRepositoryAbstract<PaymentBankModel> implements PaymentBankRepositoryInterface {
  constructor(@InjectModel(PaymentBankModel) private readonly paymentBankModel: typeof PaymentBankModel) {
    super(paymentBankModel);
  }
}
