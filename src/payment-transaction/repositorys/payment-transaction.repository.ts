import { PaymentTransactionModel } from 'src/model/payment-transaction.model';
import { PaymentTransactionRepositoryInterface } from '../interfaces/payment-transaction.interface';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/repositories/base';

export class PaymentTransactionRepository extends BaseRepositoryAbstract<PaymentTransactionModel> implements PaymentTransactionRepositoryInterface {
  constructor(@InjectModel(PaymentTransactionModel) private readonly paymentTransactionModel: typeof PaymentTransactionModel) {
    super(paymentTransactionModel);
  }
}
