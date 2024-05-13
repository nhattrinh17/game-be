import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AddOrRemoveBankInPayment, UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepositoryInterface } from './interface/payment.interface';
import { PaymentTypeService } from 'src/payment-type/payment-type.service';
import { BankService } from 'src/bank/bank.service';
import { TypePayment, messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';
import { PaymentBankRepositoryInterface } from './interface/paymentBank.interface';

@Injectable()
export class PaymentService {
  constructor(
    @Inject('PaymentRepositoryInterface')
    private readonly paymentRepository: PaymentRepositoryInterface,
    @Inject('PaymentBankRepositoryInterface')
    private readonly paymentBankRepository: PaymentBankRepositoryInterface,
    private readonly paymentTypeService: PaymentTypeService,
    private readonly bankService: BankService,
  ) {}

  async create(dto: CreatePaymentDto) {
    if (!dto.paymentTypeId || !dto.methodImage || !dto.type) throw Error(messageResponse.system.missingData);
    if ((dto.type == TypePayment.showPopup && !dto.imagePopup) || (dto.type == TypePayment.showMessage && !dto.message)) throw Error(messageResponse.system.dataInvalid);
    const checkPaymentType = await this.paymentTypeService.checkExit(dto.paymentTypeId);
    if (!checkPaymentType) throw Error(messageResponse.payment.paymentTypeIdNotFound);
    if (dto.bankIds?.length) {
      const checkBanks = await Promise.all(dto.bankIds.map((bank) => this.bankService.checkExitById(bank)));
      if (checkBanks.find((bank) => bank == 0)) throw Error(messageResponse.payment.bankNotFound);
    }
    const slug = generateSlug(dto.methodName);
    const checkExit = await this.paymentRepository.findOneByCondition({ slug });
    if (checkExit) throw Error(messageResponse.system.duplicateData);

    const paymentCreate = await this.paymentRepository.create({ ...dto, slug });
    if (dto.bankIds?.length) {
      Promise.all(
        dto.bankIds.map(async (bank) => {
          return this.paymentBankRepository.create({ paymentId: paymentCreate.id, bankId: bank });
        }),
      );
    }
    return paymentCreate;
  }

  findAll(pagination: Pagination, paymentTypeId: number, sort?: string, typeSort?: string) {
    console.log('🚀 ~ PaymentService ~ findAll ~ paymentTypeId:', paymentTypeId);
    const condition: any = {};
    if (paymentTypeId) condition.paymentTypeId = paymentTypeId;

    return this.paymentRepository.findAll(condition, { page: pagination.page, sort, typeSort, offset: pagination.offset, limit: pagination.limit, projection: ['id', 'methodName', 'methodImage', 'nameWarning', 'status', 'type', 'imagePopup', 'message', 'showAccount'] });
  }

  getPaymentBankByPaymentId(id: number) {
    return this.paymentBankRepository.findAllDataBankByPaymentId(id);
  }

  async findOne(id: number) {
    const paymentById = await this.paymentRepository.findOneById(id);
    if (!paymentById) throw Error(messageResponse.system.idInvalid);
    const paymentBank = await this.paymentBankRepository.findAllDataBankByPaymentId(id);
    return {
      ...paymentById.toJSON(),
      banks: paymentBank,
    };
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const update = await this.paymentRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  async deleteBank(idPayment: number, idBank: number) {
    const paymentById = await this.paymentRepository.findOneById(idPayment);
    if (!paymentById) throw Error(messageResponse.system.idInvalid);
    await Promise.all([this.paymentBankRepository.permanentlyDeleteByCondition({ paymentId: idPayment, bankId: idBank }), this.bankService.permanentlyDelete(idBank)]);
  }

  async addBank(idPayment: number, dto: AddOrRemoveBankInPayment) {
    const paymentById = await this.paymentRepository.findOneById(idPayment);
    if (!paymentById) throw Error(messageResponse.system.idInvalid);
    await Promise.all(
      dto.banks.map(async (bank) => {
        const checkExit = await this.paymentBankRepository.count({ paymentId: idPayment, bankId: bank });
        if (checkExit == 0) return this.paymentBankRepository.create({ paymentId: idPayment, bankId: bank });
      }),
    );
  }

  async remove(id: number) {
    const softDelete = await this.paymentRepository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }
}
