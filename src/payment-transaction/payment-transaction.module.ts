import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionController } from './payment-transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentTransactionModel } from 'src/model';
import { PaymentTransactionRepository } from './repositorys/payment-transaction.repository';

@Module({
  imports: [SequelizeModule.forFeature([PaymentTransactionModel])],
  controllers: [PaymentTransactionController],
  providers: [
    PaymentTransactionService,
    {
      provide: 'PaymentTransactionRepositoryInterface',
      useClass: PaymentTransactionRepository,
    },
  ],
})
export class PaymentTransactionModule {}
