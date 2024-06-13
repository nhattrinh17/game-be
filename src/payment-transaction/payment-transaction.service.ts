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
import { LogTelegramService } from 'src/utils/logTelegram';

@Injectable()
export class PaymentTransactionService {
  constructor(
    @Inject('PaymentTransactionRepositoryInterface')
    private readonly paymentTransactionRepository: PaymentTransactionRepositoryInterface,
    private readonly userPointService: UserPointService,
    private readonly paymentService: PaymentService,
    private readonly bankService: BankService,
    private readonly userService: UserService,
    private readonly logTelegramService: LogTelegramService,
  ) {}

  async sendRequestPaymentTransactionTele(idPT: number, type: number, bankTransfer: number, bankReceiver: number, content?: string): Promise<any> {
    let message = `${content}`;
    if (type == TypePaymentTranSaction.deposit) {
      if (bankTransfer) {
        const user = await this.bankService.findOne(bankTransfer);
        message += `từ tài khoản ${user.accountOwner}:${user.accountNumber} `;
      }
      if (bankReceiver) {
        const user = await this.bankService.findOne(bankReceiver);
        message += `đến tài khoản ${user.accountOwner}:${user.accountNumber}`;
      }
      const linkConfirm = `${process.env.API_ENTRY}/payment-transaction/${idPT}/bot-telegram`;
      message += `. Nếu đã nhận được tiền vui lòng ấn xác nhận nạp tiền qua đường link: <a href="${linkConfirm}">Click here</a>  (Hành động này sẽ KHÔNG THỂ HOÀN LẠI nếu nhầm)`;
    } else if (type == TypePaymentTranSaction.withdrawMoney) {
      if (bankReceiver) {
        const user = await this.bankService.findOne(bankReceiver);
        message += `về tài khoản ${user.accountOwner}:${user.accountNumber}. Vui lòng đăng nhập cms để xác nhận việc chuyển tiền thành công!`;
      }
    }
    return this.logTelegramService.sendToTelegram(type == TypePaymentTranSaction.deposit ? 'Nạp tiền' : 'Rút tiền', message);
  }

  async create(dto: CreatePaymentTransactionDto) {
    if (!dto.userId || dto.type == undefined || !dto.point) throw new Error(messageResponse.system.missingData);

    if (dto.type == TypePaymentTranSaction.deposit) {
      const payment = await this.paymentService.findOne(dto.paymentId);
      let qrCode = '';
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
        qrCode = `${process.env.URL_VIETQR}/${bank.binBank}-${bank.accountNumber}-${process.env.TEMPLATE_QR}?amount=${dto.point * 1000}&addInfo=${userById.username?.toUpperCase()}`;
      }
      const pt = await this.paymentTransactionRepository.create({ ...dto, qrCode });
      // Send to telegram
      const contentBase = `Có một yêu cầu nạp tiền trị giá ${(dto.point * 1000).toLocaleString('vi-VN')} mới bằng phương thức ${pt.content} `;
      this.sendRequestPaymentTransactionTele(pt.id, dto.type, pt.bankTransferId, pt.bankReceiveId, contentBase);
      return pt;
    } else {
      await this.userPointService.subtractPointToMainPoint({
        userId: dto.userId,
        points: dto.point,
        description: 'Rút tiền về tài khoản ngân hàng',
      });
      const pt = await this.paymentTransactionRepository.create(dto);
      const contentBase = 'Có một yêu cầu rút tiền ';
      this.sendRequestPaymentTransactionTele(pt.id, dto.type, pt.bankTransferId, pt.bankReceiveId, contentBase);
      return pt;
    }
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

  async update(id: number, dto: UpdateStatusPaymentTransactionDto, isBotTelegram?: boolean) {
    const transactionById = await this.paymentTransactionRepository.findOneById(id);
    if (transactionById.status != StatusPaymentTranSaction.processing) throw new Error(messageResponse.paymentTransaction.transactionHasUpdate);
    const update = await this.paymentTransactionRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    if (update.type == TypePaymentTranSaction.deposit && update.status == StatusPaymentTranSaction.success) {
      await this.userPointService.addPointToMainPoint({
        userId: update.userId,
        points: update.point,
        description: isBotTelegram ? 'Nạp tiền vào tài khoản chính qua bot telegram' : 'Nạp tiền vào tài khoản chính',
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
