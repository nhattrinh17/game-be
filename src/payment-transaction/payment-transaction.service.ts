import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { AddReceiptDto, UpdateStatusPaymentTransactionDto } from './dto/update-payment-transaction.dto';
import { PaymentTransactionRepositoryInterface } from './interfaces/payment-transaction.interface';
import { StatusPaymentTranSaction, TypePaymentTranSaction, messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { BanksModel, UserModel } from 'src/model';
import { UserPointService } from 'src/user-point/user-point.service';

@Injectable()
export class PaymentTransactionService {
  constructor(
    @Inject('PaymentTransactionRepositoryInterface')
    private readonly paymentTransactionRepository: PaymentTransactionRepositoryInterface,
    private readonly userPointService: UserPointService,
  ) {}

  create(dto: CreatePaymentTransactionDto) {
    if (!dto.userId || !dto.bankReceiveId || !dto.bankReceiveId || dto.type == undefined || !dto.point) throw new Error(messageResponse.system.missingData);
    return this.paymentTransactionRepository.create(dto);
  }

  findAll(pagination: Pagination, userId: number, type: string, status: number, sort?: string, typeSort?: string) {
    const condition: any = {};
    if (userId) condition.userId = userId;
    if (status) condition.status = status;
    if (type) condition.type = type;

    return this.paymentTransactionRepository.findAll(condition, {
      sort,
      typeSort,
      offset: pagination.offset,
      limit: pagination.limit,
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
      });
    }
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
