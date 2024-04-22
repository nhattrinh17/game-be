import { Inject, Injectable } from '@nestjs/common';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { PaymentTypeRepositoryInterface } from './payment-type.interface';
import { generateSlug } from 'src/utils';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class PaymentTypeService {
  constructor(
    @Inject('PaymentTypeRepositoryInterface')
    private payment_type_repository: PaymentTypeRepositoryInterface,
  ) {}

  async create(dto: CreatePaymentTypeDto) {
    if (!dto.name) throw new Error(messageResponse.system.badRequest);
    const slug = generateSlug(dto.name);
    const checkExit = await this.payment_type_repository.findOneByCondition({ slug: slug });
    if (checkExit) throw new Error(messageResponse.system.badRequest);

    return this.payment_type_repository.create({ ...dto, slug });
  }

  findAll(search: string, pagination: Pagination, sort?: string, status?: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (status) filter.status = status;
    return this.payment_type_repository.findAll(filter, { ...pagination, sort, projection: ['id', 'name', 'status', 'slug', 'minimum', 'maximum'] });
  }

  findOne(id: number) {
    return this.payment_type_repository.findOneById(id, ['id', 'name', 'status', 'minimum', 'maximum']);
  }

  checkExit(id: number) {
    return this.payment_type_repository.count({ id });
  }

  async update(id: number, dto: UpdatePaymentTypeDto) {
    const update = await this.payment_type_repository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  async remove(id: number) {
    const softDelete = await this.payment_type_repository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }
}
