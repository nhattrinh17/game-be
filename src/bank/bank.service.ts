import { Inject, Injectable } from '@nestjs/common';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { BankRepositoryInterface } from './bank.interface';
import { Op } from 'sequelize';
import { Pagination } from 'src/middlewares';
import { binBanks, messageResponse } from 'src/constants';

@Injectable()
export class BankService {
  constructor(
    @Inject('BankRepositoryInterface')
    private readonly bankRepository: BankRepositoryInterface,
  ) {}

  async create(dto: CreateBankDto, userId: number) {
    if (!dto.accountNumber || !dto.binBank || !dto.accountOwner || !dto.nameBank) throw Error(messageResponse.system.missingData);
    if (!binBanks[dto.binBank]) throw new Error(messageResponse.system.badRequest);
    const dataInsert = dto.isForUser ? { ...dto, userId } : dto;
    if (dto.isForUser) {
      const totalBank = await this.bankRepository.count({ userId });
      if (totalBank >= 4) throw new Error(messageResponse.banks.numberBanksMax);
    }
    return this.bankRepository.create(dataInsert);
  }

  findAll(search: string, isForUser: number, userId: number, pagination: Pagination, sort?: string, typeSort?: string) {
    const condition: any = {};
    if (isForUser) {
      condition.userId = userId;
    } else {
      if (search) {
        condition.name = { [Op.like]: `%${search.trim()}%` };
      }
    }

    return this.bankRepository.findAll(condition, { sort, typeSort, offset: pagination.offset, limit: pagination.limit });
  }

  findAllBankCms(search: string, userId: number, pagination: Pagination, sort?: string, typeSort?: string) {
    const condition: any = {};
    if (userId) {
      condition.userId = userId;
    } else {
      if (search) {
        condition.name = { [Op.like]: `%${search.trim()}%` };
      }
    }

    return this.bankRepository.findAll(condition, { sort, typeSort, offset: pagination.offset, limit: pagination.limit });
  }

  findOne(id: number) {
    return this.bankRepository.findOneById(id);
  }

  checkExitById(id: number) {
    return this.bankRepository.count({ id });
  }

  async update(id: number, dto: UpdateBankDto) {
    const update = await this.bankRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  async remove(id: number) {
    const softDelete = await this.bankRepository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }

  async permanentlyDelete(id: number) {
    return this.bankRepository.permanentlyDelete(id);
  }
}
