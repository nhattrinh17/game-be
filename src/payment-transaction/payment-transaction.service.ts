import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { AddReceiptDto, UpdateStatusPaymentTransactionDto } from './dto/update-payment-transaction.dto';
import { PaymentTransactionRepositoryInterface } from './interfaces/payment-transaction.interface';
import { StatusPaymentTranSaction, TypePayment, TypePaymentTranSaction, messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { BanksModel, UserModel } from 'src/model';
import { UserPointService } from 'src/user-point/user-point.service';
import { PaymentService } from 'src/payment/payment.service';
import { BankService } from 'src/bank/bank.service';
import { UserService } from 'src/user/user.service';
import { Op } from 'sequelize';

@Injectable()
export class PaymentTransactionService {
  constructor(
    @Inject('PaymentTransactionRepositoryInterface')
    private readonly paymentTransactionRepository: PaymentTransactionRepositoryInterface,
    private readonly userPointService: UserPointService,
    private readonly paymentService: PaymentService,
    private readonly bankService: BankService,
    private readonly userService: UserService,
  ) {}

  async create(dto: CreatePaymentTransactionDto) {
    if (!dto.userId || dto.type == undefined || !dto.point) throw new Error(messageResponse.system.missingData);
    // if(dto.type == TypePaymentTranSaction.deposit) throw new Error(messageResponse.system.missingData);

    if (dto.type == TypePaymentTranSaction.deposit) {
      const payment = await this.paymentService.findOne(dto.paymentId);
      if (payment.type == TypePayment.showPopup) {
        let bank: BanksModel = null;
        if (dto.bankReceiveId) {
          bank = await this.bankService.findOne(dto.bankReceiveId);
        } else {
          const banks: BanksModel[] = await this.paymentService.getPaymentBankByPaymentId(dto.paymentId);
          bank = banks[Math.floor(Math.random() * banks.length)];
          dto.bankReceiveId = bank.id;
        }
        const userById = await this.userService.findOne(dto.userId);
        const qrCode = `${process.env.URL_VIETQR}/${bank.binBank}-${bank.accountNumber}-${process.env.TEMPLATE_QR}?amount=${dto.point * 1000}&addInfo=${userById.username?.toUpperCase()}`;
        return this.paymentTransactionRepository.create({ ...dto, qrCode });
      }
    } else {
      await this.userPointService.subtractPointToMainPoint({
        userId: dto.userId,
        points: dto.point,
        description: 'Rút tiền về tài khoản ngân hàng',
      });
    }
    return this.paymentTransactionRepository.create(dto);
  }

  async getTotalDepositWithDraw(dateFrom: Date, dateTo: Date, userId: number) {
    if (dateFrom || dateTo) {
      if (!dateFrom) {
        const dateToNumber = new Date(dateTo).getTime();
        dateFrom = new Date(dateToNumber - 1000 * 60 * 60 * 24 * 7);
      } else if (!dateTo) {
        const dateFromNumber = new Date(dateFrom).getTime();
        dateTo = new Date(dateFromNumber + 1000 * 60 * 60 * 24 * 7);
      }

      const condition: any = {
        createdAt: {
          [Op.lt]: dateTo,
          [Op.gt]: dateFrom,
        },
        status: StatusPaymentTranSaction.success,
      };
      if (userId) condition.userId = userId;
      const data = await this.paymentTransactionRepository.getTotalDepositsAndWithDraw(condition);
      return { data };
    } else {
      return null;
    }
  }

  findAll(pagination: Pagination, userId: number, type: number, status: number, dateFrom: Date, dateTo: Date, sort?: string, typeSort?: string) {
    const condition: any = {};
    if (userId) condition.userId = userId;
    if (status) {
      if (status == 3) {
        condition.status = {
          [Op.ne]: StatusPaymentTranSaction.success,
        };
      } else {
        condition.status = status;
      }
    }
    if (type) condition.type = type;
    // console.log('🛫🛫🛫 ~ file: payment-transaction.service.ts:78 ~ findAll ~ dateFrom || dateTo:', dateFrom, dateTo);
    if (dateFrom || dateTo) {
      if (!dateFrom) {
        const dateToNumber = new Date(dateTo).getTime();
        dateFrom = new Date(dateToNumber - 1000 * 60 * 60 * 24 * 7);
      } else if (!dateTo) {
        const dateFromNumber = new Date(dateFrom).getTime();
        dateTo = new Date(dateFromNumber + 1000 * 60 * 60 * 24 * 7);
      }

      condition.createdAt = {
        [Op.lt]: dateTo,
        [Op.gt]: dateFrom,
      };
    }
    // console.log('🛫🛫🛫 ~ file: payment-transaction.service.ts:87 ~ findAll ~ condition:', condition);

    return this.paymentTransactionRepository.findAll(condition, {
      sort,
      typeSort,
      offset: pagination.offset,
      limit: pagination.limit,
      page: pagination.page,
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'username', 'email'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: BanksModel,
          as: 'bankReceive',
          attributes: ['id', 'binBank', 'accountOwner', 'accountNumber'],
        },
        {
          model: BanksModel,
          as: 'bankTransfer',
          attributes: ['id', 'binBank', 'accountOwner', 'accountNumber'],
        },
      ],
    });
  }

  async findOne(id: number) {
    const paymentById = await this.paymentTransactionRepository.findOneById(id, [], {
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['id', 'username', 'email'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: BanksModel,
          as: 'bankTransfer',
          attributes: ['id', 'nameBank', 'accountOwner'],
        },
        {
          model: BanksModel,
          as: 'bankReceive',
          attributes: ['id', 'nameBank', 'accountOwner'],
        },
      ],
    });
    if (!paymentById) throw Error(messageResponse.system.idInvalid);
    return paymentById;
  }

  async update(id: number, dto: UpdateStatusPaymentTransactionDto) {
    const transactionById = await this.paymentTransactionRepository.findOneById(id);
    if (transactionById.status != StatusPaymentTranSaction.processing) throw new Error(messageResponse.paymentTransaction.transactionHasUpdate);
    const update = await this.paymentTransactionRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    if (update.type == TypePaymentTranSaction.deposit && update.status == StatusPaymentTranSaction.success) {
      await this.userPointService.addPointToMainPoint({
        userId: update.userId,
        points: update.point,
        description: 'Nạp tiền vào tài khoản chính',
      });
    }
    // if (update.type == TypePaymentTranSaction.withdrawMoney && update.status == StatusPaymentTranSaction.success) {
    //   await this.userPointService.subtractPointToMainPoint({
    //     userId: update.userId,
    //     points: update.point,
    //   });
    // }
    return update;
  }

  async addReceiptPaymentTransaction(id: number, dto: AddReceiptDto) {
    const transactionById = await this.paymentTransactionRepository.findOneById(id);
    if (transactionById.status != StatusPaymentTranSaction.processing) throw new Error(messageResponse.paymentTransaction.transactionHasUpdate);
    const update = await this.paymentTransactionRepository.findByIdAndUpdate(id, { receipt: dto.receipt });
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  remove(id: number) {
    return this.paymentTransactionRepository.softDelete(id);
  }
}
