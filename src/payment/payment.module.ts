import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { PaymentRepository } from './repository/payment.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentBankModel, PaymentModel } from 'src/model';
import { PaymentTypeService } from 'src/payment-type/payment-type.service';
import { BankService } from 'src/bank/bank.service';
import { BankModule } from 'src/bank/bank.module';
import { PaymentTypeModule } from 'src/payment-type/payment-type.module';
import { PaymentBankRepository } from './repository/paymentBank.repository';

@Module({
  imports: [SequelizeModule.forFeature([PaymentModel, PaymentBankModel]), BankModule, PaymentTypeModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'PaymentRepositoryInterface',
      useClass: PaymentRepository,
    },
    {
      provide: 'PaymentBankRepositoryInterface',
      useClass: PaymentBankRepository,
    },
    PaymentTypeService,
    BankService,
  ],
  exports: [
    PaymentService,
    {
      provide: 'PaymentRepositoryInterface',
      useClass: PaymentRepository,
    },
    {
      provide: 'PaymentBankRepositoryInterface',
      useClass: PaymentBankRepository,
    },
  ],
})
export class PaymentModule {}
