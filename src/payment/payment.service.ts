import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AddOrRemoveBankInPayment, UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentRepositoryInterface } from './interface/payment.interface';
import { PaymentTypeService } from 'src/payment-type/payment-type.service';
import { BankService } from 'src/bank/bank.service';
import { messageResponse } from 'src/constants';
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
    if (!dto.paymentTypeId || !dto.methodImage || !dto.methodName || !dto.minimum || !dto.maximum) throw Error(messageResponse.system.missingData);
    const checkPaymentType = await this.paymentTypeService.checkExit(dto.paymentTypeId);
    if (!checkPaymentType) throw Error(messageResponse.payment.paymentTypeIdNotFound);
    if (dto.bankIds?.length) {
      const checkBanks = await Promise.all(dto.bankIds.map((bank) => this.bankService.checkExitById(bank)));
      if (checkBanks.find((bank) => bank == 0)) throw Error(messageResponse.payment.bankNotFound);
    }
    const slug = generateSlug(dto.methodName);
    const checkExit = await this.paymentRepository.findOneByCondition({ slug });
    if (checkExit) throw Error(messageResponse.system.duplicateData);
    return this.paymentRepository.create({ ...dto, slug });
  }

  findAll(search: string, pagination: Pagination, paymentTypeId: number, sort?: string) {
    const condition: any = {
      name: { name: { [Op.like]: `%${search.trim()}%` } },
    };
    if (paymentTypeId) condition.paymentTypeId = paymentTypeId;

    return this.paymentRepository.findAll(condition, { order: sort, offset: pagination.offset, limit: pagination.limit });
  }

  findOne(id: number) {
    return this.paymentRepository.findOneById(id);
  }

  async update(id: number, dto: UpdatePaymentDto) {
    const update = await this.paymentRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  // async deleteBank(idPayment: number, dto: AddOrRemoveBankInPayment) {
  //   const paymentById = await this.paymentRepository.findOneById(idPayment);
  //   if (!paymentById) throw Error(messageResponse.system.idInvalid);
  //   if (!paymentById.bankIds.find((bankId) => bankId == dto.bank)) throw Error(messageResponse.payment.bankNotFound);
  //   paymentById.bankIds = paymentById.bankIds.filter((bankId) => bankId != dto.bank);
  //   return paymentById.save();
  // }

  // async addBank(idPayment: number, dto: AddOrRemoveBankInPayment) {
  //   const paymentById = await this.paymentRepository.findOneById(idPayment);
  //   if (!paymentById) throw Error(messageResponse.system.idInvalid);
  //   if (paymentById.bankIds.find((bankId) => bankId == dto.bank)) throw Error(messageResponse.payment.bankHasExist);
  //   paymentById.bankIds.push(dto.bank);
  //   return paymentById.save();
  // }

  async remove(id: number) {
    const softDelete = await this.paymentRepository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }
}
