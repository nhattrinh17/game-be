import { PaymentTransactionModel } from 'src/model/payment-transaction.model';
import { BaseRepositoryInterface } from 'src/repositories/base';

export interface PaymentTransactionRepositoryInterface extends BaseRepositoryInterface<PaymentTransactionModel> {
  getTotalDepositsAndWithDraw(condition: any);
}
