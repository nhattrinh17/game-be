import { Module } from '@nestjs/common';
import { GiftCodeService } from './gift-code.service';
import { GiftCodeController } from './gift-code.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { GiftCodeModel } from 'src/model';
import { GiftCodeRepository } from './repository/gift-code.repository';
import { UserPointService } from 'src/user-point/user-point.service';
import { UserPointModule } from 'src/user-point/user-point.module';
import { UserModule } from 'src/user/user.module';
import { GamePointModule } from 'src/game-point/game-point.module';
import { RedisModule } from 'src/cache/redis.module';

@Module({
  imports: [
    //
    SequelizeModule.forFeature([GiftCodeModel]),
    UserPointModule,
    UserModule,
    GamePointModule,
    RedisModule,
  ],
  controllers: [GiftCodeController],
  providers: [
    UserPointService,
    GiftCodeService,
    {
      provide: 'GiftCodeRepositoryInterface',
      useClass: GiftCodeRepository,
    },
  ],
})
export class GiftCodeModule {}
