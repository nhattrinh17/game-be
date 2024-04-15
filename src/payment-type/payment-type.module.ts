import { Module } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { PaymentTypeController } from './payment-type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentTypeModel } from 'src/model';
import { PaymentTypeRepository } from './payment-type.repository';

@Module({
  imports: [SequelizeModule.forFeature([PaymentTypeModel])],
  controllers: [PaymentTypeController],
  providers: [
    PaymentTypeService,
    {
      provide: 'PaymentTypeRepositoryInterface',
      useClass: PaymentTypeRepository,
    },
  ],
  exports: [PaymentTypeService],
})
export class PaymentTypeModule {}
