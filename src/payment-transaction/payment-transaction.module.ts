import { Module } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { PaymentTransactionController } from './payment-transaction.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentTransactionModel } from 'src/model';
import { PaymentTransactionRepository } from './repositorys/payment-transaction.repository';
import { UserPointModule } from 'src/user-point/user-point.module';
import { UserPointService } from 'src/user-point/user-point.service';
import { UserModule } from 'src/user/user.module';
import { GamePointModule } from 'src/game-point/game-point.module';
import { RedisService } from 'src/cache/redis.service';
import { PaymentModule } from 'src/payment/payment.module';
import { BankModule } from 'src/bank/bank.module';
import { HttpModule } from '@nestjs/axios';
import { LogTelegramService } from 'src/utils/logTelegram';

@Module({
  imports: [
    //
    HttpModule,
    SequelizeModule.forFeature([PaymentTransactionModel]),
    UserPointModule,
    UserModule,
    GamePointModule,
    PaymentModule,
    BankModule,
  ],
  controllers: [PaymentTransactionController],
  providers: [
    PaymentTransactionService,
    {
      provide: 'PaymentTransactionRepositoryInterface',
      useClass: PaymentTransactionRepository,
    },
    LogTelegramService,
    UserPointService,
    RedisService,
  ],
})
export class PaymentTransactionModule {}
