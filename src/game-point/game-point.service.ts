import { Inject, Injectable } from '@nestjs/common';
import { CreateGamePointDto } from './dto/create-game-point.dto';
import { UpdateGamePointDto } from './dto/update-game-point.dto';
import { GamePointRepositoryInterface } from './interface/game-point.interface';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { generateSlug } from 'src/utils';

@Injectable()
export class GamePointService {
  constructor(
    @Inject('GamePointRepositoryInterface')
    private readonly gamePointRepository: GamePointRepositoryInterface,
  ) {}

  async create(dto: CreateGamePointDto) {
    if (!dto.name || dto.type == undefined) throw new Error(messageResponse.system.missingData);
    const slug = generateSlug(dto.name);
    const checkExit = await this.gamePointRepository.count({ slug });
    if (checkExit) throw new Error(messageResponse.system.duplicateData);
    return this.gamePointRepository.create(dto);
  }

  findAll(pagination: Pagination, sort?: string, typeSort?: string) {
    const filter: any = {};
    return this.gamePointRepository.findAll(filter, { ...pagination, sort, typeSort, projection: ['id', 'name', 'desc', 'type', 'group'] });
  }

  findOne(id: number) {
    return this.gamePointRepository.findOneById(id, ['id', 'name', 'desc', 'type', 'group']);
  }

  checkExit(id: number) {
    return this.gamePointRepository.count({ id });
  }

  async update(id: number, dto: UpdateGamePointDto) {
    const update = await this.gamePointRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  async remove(id: number) {
    const softDelete = await this.gamePointRepository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }
}
