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

  create(dto: CreateBankDto) {
    if (!dto.accountNumber || !dto.binBank || !dto.accountOwner || !dto.branch || !dto.nameBank) throw Error(messageResponse.system.missingData);
    if (!binBanks[dto.binBank]) throw new Error(messageResponse.system.badRequest);
    return this.bankRepository.create(dto);
  }

  findAll(search: string, pagination: Pagination, sort?: string, typeSort?: string) {
    const condition: any = {
      name: { name: { [Op.like]: `%${search.trim()}%` } },
    };

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
}
