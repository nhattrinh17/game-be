import { PaymentBankModel } from 'src/model';
import { BaseRepositoryInterface } from 'src/repositories/base/base.interface.repository';

export interface PaymentBankRepositoryInterface extends BaseRepositoryInterface<PaymentBankModel> {
  findAllDataBankByPaymentId(paymentId: number);
}
