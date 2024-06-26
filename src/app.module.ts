import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'nestjs-firebase';
import { FirebaseService } from './utils/firebase-service';
import { UserModule } from './user/user.module';
import { RedisService } from './cache/redis.service';
import { PaginationMiddleware } from './middlewares';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards';
import { UploadModule } from './upload/upload.module';
import { SequelizeModule } from '@nestjs/sequelize';
// import { User } from './model';
import { Dialect } from 'sequelize';
import { Environment } from './constants';
import { SendMailService } from './send-mail/send-mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { GroupModule } from './group/group.module';
import { PermissionActionModule } from './permission-action/permission-action.module';
import { GameTypeModule } from './game-type/game-type.module';
import { PaymentTypeModule } from './payment-type/payment-type.module';
import { PaymentModule } from './payment/payment.module';
import { BankModule } from './bank/bank.module';
import { GameModule } from './game/game.module';
import { PermissionGuard } from './auth/guards/permission.guard';
import { PaymentTransactionModule } from './payment-transaction/payment-transaction.module';
import { NotificationModule } from './notification/notification.module';
import { GamePointModule } from './game-point/game-point.module';
import { UserPointModule } from './user-point/user-point.module';
import { GiftCodeModule } from './gift-code/gift-code.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';

console.log(__dirname);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`, `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      expandVariables: true,
    }),

    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get('THROTTLE_TTL'),
          limit: config.get('THROTTLE_LIMIT'),
        },
      ],
    }),
    // Connect to Models
    SequelizeModule.forRoot({
      dialect: process.env.DATABASE_DIALECT as Dialect,
      host: process.env.MYSQL_HOST,
      port: +process.env.MYSQL_PORT,
      username: process.env.MYSQL_USERNAME,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DBNAME,
      synchronize: process.env.APP_ID == Environment.Development,
      autoLoadModels: true,
      // logging: false,
      retry: {
        max: 5, // Số lần thử lại tối đa
      },
      // Lắng nghe sự kiện khi có lỗi kết nối
      dialectOptions: {
        connectTimeout: 8000, // Thời gian chờ kết nối (30 giây)
      },
      logging: (log) => {
        console.log(log); // Để theo dõi log kết nối trong quá trình phát triển
      },
    }),
    // SequelizeModule.forFeature([User]),
    // FireBase
    FirebaseModule.forRoot({
      googleApplicationCredential: {
        clientEmail: process.env.CLIENT_EMAIL,
        privateKey: process.env.PRIVATE_KEY,
        projectId: process.env.PROJECT_ID,
      },
      storageBucket: process.env.STORAGE_BUCKET,
    }),
    UserModule,
    AuthModule,
    UploadModule,
    GroupModule,
    PermissionActionModule,
    GameTypeModule,
    GameModule,
    PaymentTypeModule,
    PaymentModule,
    BankModule,
    PaymentTransactionModule,
    NotificationModule,
    GamePointModule,
    UserPointModule,
    GiftCodeModule,
  ],
  providers: [
    //
    FirebaseService,
    RedisService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: PermissionGuard },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // SendMailService,
  ],
})
export class AppModule implements NestModule {
  // Add middleware
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware).forRoutes({ path: '*', method: RequestMethod.GET });
  }
}
