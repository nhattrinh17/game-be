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

@Module({
  imports: [SequelizeModule.forFeature([PaymentTransactionModel]), UserPointModule, UserModule, GamePointModule],
  controllers: [PaymentTransactionController],
  providers: [
    PaymentTransactionService,
    {
      provide: 'PaymentTransactionRepositoryInterface',
      useClass: PaymentTransactionRepository,
    },
    UserPointService,
    RedisService,
  ],
})
export class PaymentTransactionModule {}
