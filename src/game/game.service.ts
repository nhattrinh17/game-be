import { Inject, Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameRepositoryInterface } from './interface/game.interface';
import { messageResponse } from 'src/constants';
import { generateSlug } from 'src/utils';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';
import { GamePointModel } from 'src/model';
import { GamePointService } from 'src/game-point/game-point.service';
import { GameTypeService } from 'src/game-type/game-type.service';

@Injectable()
export class GameService {
  constructor(
    @Inject('GameRepositoryInterface') private readonly gameRepository: GameRepositoryInterface,
    private readonly gamePointService: GamePointService,
    private readonly gameTypeService: GameTypeService,
  ) {}

  async create(dto: CreateGameDto) {
    if (!dto.name || !dto.gamePointId || !dto.gameTypeId) throw new Error(messageResponse.system.missingData);
    const checkAll = await Promise.all([this.gamePointService.checkExit(dto.gamePointId), this.gameTypeService.checkExit(dto.gameTypeId)]);
    if (checkAll.includes(0)) throw new Error(messageResponse.system.notFound);
    const slug = generateSlug(dto.name);
    const checkExit = await this.gameRepository.count({ slug });
    if (checkExit > 0) throw Error(messageResponse.system.duplicateData);
    return this.gameRepository.create({ ...dto, slug });
  }

  findAll(search: string, pagination: Pagination, sort?: string, status?: string, typeSort?: string) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search}%` };
    if (status) filter.status = status;
    return this.gameRepository.findAll(filter, {
      ...pagination,
      sort,
      typeSort,
      projection: ['id', 'name', 'gamePointId', 'createdAt', 'updatedAt'],
      include: [
        {
          model: GamePointModel,
          as: 'gamePoint',
          attributes: ['id', 'name', 'group'],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.gameRepository.findOneById(id, ['id', 'name', 'gamePointId'], {
      include: [
        {
          model: GamePointModel,
          as: 'gamePoint',
          attributes: ['id', 'name', 'group'],
        },
      ],
    });
  }

  async update(id: number, dto: UpdateGameDto) {
    const update = await this.gameRepository.findByIdAndUpdate(id, dto);
    if (!update) throw Error(messageResponse.system.badRequest);
    return update;
  }

  async remove(id: number) {
    const softDelete = await this.gameRepository.softDelete(id);
    if (!softDelete) throw Error(messageResponse.system.badRequest);
    return softDelete;
  }
}
