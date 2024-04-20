import { Inject, Injectable } from '@nestjs/common';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';
import { GameTypeRepositoryInterface } from './game-type.interface';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';

@Injectable()
export class GameTypeService {
  constructor(
    @Inject('GameTypeRepositoryInterface')
    private readonly gameTypeRepository: GameTypeRepositoryInterface,
  ) {}

  async create(dto: CreateGameTypeDto) {
    if (!dto.name) throw new Error(messageResponse.system.missingData);
    dto.slug = generateSlug(dto.name);
    const checkDuplicate = await this.gameTypeRepository.findOneByCondition({ slug: dto.slug });
    if (checkDuplicate) throw new Error(messageResponse.system.duplicateData);
    return this.gameTypeRepository.create(dto);
  }

  findAll(search: string, pagination: Pagination, status?: string, sort?: string) {
    const condition: any = {};
    if (search) condition.name = { name: { [Op.like]: `%${search.trim()}%` } };
    if (status) condition.status = status;

    return this.gameTypeRepository.findAll(condition, { sort, offset: pagination.offset, limit: pagination.limit });
  }

  findOne(id: number) {
    return this.gameTypeRepository.findOneById(id);
  }

  checkExit(id: number) {
    return this.gameTypeRepository.count({ id });
  }

  async update(id: number, updateGameTypeDto: UpdateGameTypeDto) {
    const update = await this.gameTypeRepository.findByIdAndUpdate(id, updateGameTypeDto);
    if (!update) throw new Error(messageResponse.system.notFound);
    return update;
  }

  async remove(id: number) {
    const deleteItem = await this.gameTypeRepository.softDelete(id);
    if (!deleteItem) throw new Error(messageResponse.system.notFound);
  }
}
