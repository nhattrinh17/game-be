import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionController } from './payment-transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentTransactionModel } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([PaymentTransactionModel])],
  controllers: [PaymentTransactionController],
  providers: [PaymentTransactionService],
})
export class PaymentTransactionModule {}
