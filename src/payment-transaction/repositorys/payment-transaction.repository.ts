import { PaymentTransactionModel } from 'src/model/payment-transaction.model';
import { PaymentTransactionRepositoryInterface } from '../interfaces/payment-transaction.interface';
import { InjectModel } from '@nestjs/sequelize';
import { BaseRepositoryAbstract } from 'src/repositories/base';
import { Sequelize } from 'sequelize';

export class PaymentTransactionRepository extends BaseRepositoryAbstract<PaymentTransactionModel> implements PaymentTransactionRepositoryInterface {
  constructor(@InjectModel(PaymentTransactionModel) private readonly paymentTransactionModel: typeof PaymentTransactionModel) {
    super(paymentTransactionModel);
  }

  getTotalDepositsAndWithDraw(condition: any) {
    return this.paymentTransactionModel.findAll({
      where: condition,
      attributes: ['type', [Sequelize.fn('sum', Sequelize.col('point')), 'totalPoints']],
      group: 'type',
      raw: true,
    });
  }
}
