import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { PaymentRepositoryInterface } from '../interface/payment.interface';

@Injectable()
export class PaymentRepository extends BaseRepositoryAbstract<PaymentModel> implements PaymentRepositoryInterface {
  constructor(@InjectModel(PaymentModel) private readonly paymentModel: typeof PaymentModel) {
    super(paymentModel);
  }
}
