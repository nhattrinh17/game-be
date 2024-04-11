import { Inject, Injectable } from '@nestjs/common';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';
import { GameTypeRepositoryInterface } from './game-type.interface';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class GameTypeService {
  constructor(
    @Inject('GameTypeRepositoryInterface')
    private readonly gameTypeRepository: GameTypeRepositoryInterface,
  ) {}

  create(createGameTypeDto: CreateGameTypeDto) {
    return this.gameTypeRepository.create(createGameTypeDto);
  }

  findAll(search: string, pagination: Pagination, status?: string, sort?: string) {
    const condition: any = {
      name: { name: { [Op.like]: `%${search.trim()}%` } },
    };
    if (status) condition.status = status;

    return this.gameTypeRepository.findAll(condition, { order: sort, offset: pagination.offset, limit: pagination.limit });
  }

  findOne(id: number) {
    return this.gameTypeRepository.findOneById(id);
  }

  update(id: number, updateGameTypeDto: UpdateGameTypeDto) {
    return this.gameTypeRepository.findByIdAndUpdate(id, updateGameTypeDto);
  }

  remove(id: number) {
    return this.gameTypeRepository.softDelete(id);
  }
}
