import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { BankRepository } from './bank.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { BanksModel } from 'src/model';

@Module({
  imports: [SequelizeModule.forFeature([BanksModel])],
  controllers: [BankController],
  providers: [
    BankService,
    {
      provide: 'BankRepositoryInterface',
      useClass: BankRepository,
    },
  ],
  exports: [
    {
      provide: 'BankRepositoryInterface',
      useClass: BankRepository,
    },
  ],
})
export class BankModule {}
