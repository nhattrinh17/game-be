import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PaymentBankModel } from 'src/model';
import { BaseRepositoryAbstract } from 'src/repositories/base/base.abstract.repository';
import { PaymentBankRepositoryInterface } from '../interfaces/paymentBank.interface';

@Injectable()
export class PaymentBankRepository extends BaseRepositoryAbstract<PaymentBankModel> implements PaymentBankRepositoryInterface {
  constructor(@InjectModel(PaymentBankModel) private readonly paymentBankModel: typeof PaymentBankModel) {
    super(paymentBankModel);
  }

  async findAllDataBankByPaymentId(paymentId: number) {
    const paymentBanks = await this.paymentBankModel.findAll({
      where: { paymentId },
      include: [{ association: PaymentBankModel.associations.bank }],
    });

    // Trả về danh sách các banks được lấy từ bảng PaymentBankModel
    return paymentBanks.map((paymentBank) => paymentBank.bank);
  }
}
