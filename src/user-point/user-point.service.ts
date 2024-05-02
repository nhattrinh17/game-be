import { Inject, Injectable } from '@nestjs/common';
import { AddPointToMainPointDto } from './dto/create-user-point.dto';
import { MovePointToGameOtherDto } from './dto/update-user-point.dto';
import { UserPointRepositoryInterface } from './interface/user-point.interface';
import { UserService } from 'src/user/user.service';
import { GamePointService } from 'src/game-point/game-point.service';
import { messageResponse } from 'src/constants';
import { Sequelize } from 'sequelize-typescript';
import { RedisService } from 'src/cache/redis.service';
import { GamePointModel } from 'src/model';

@Injectable()
export class UserPointService {
  constructor(
    @Inject('UserPointRepositoryInterface') private userPointRepository: UserPointRepositoryInterface,
    private readonly userService: UserService,
    private readonly gamePointService: GamePointService,
    private readonly sequelize: Sequelize,
    private readonly cacheService: RedisService,
  ) {}

  async addPointToMainPoint(dto: AddPointToMainPointDto) {
    if (!dto.userId) throw new Error(messageResponse.system.missingData);
    const checkDto = await this.userService.checkExist(dto.userId);
    if (!checkDto) throw new Error(messageResponse.system.notFound);
    const result = await this.sequelize.query(`CALL add_money_to_main(:userIdParam, :pointsToAdd, @resultMessage)`, {
      replacements: { userIdParam: dto.userId, pointsToAdd: dto.points },
      type: 'RAW',
    });
    return result;
  }

  async subtractPointToMainPoint(dto: AddPointToMainPointDto) {
    if (!dto.userId) throw new Error(messageResponse.system.missingData);
    const checkDto = await this.userService.checkExist(dto.userId);
    if (!checkDto) throw new Error(messageResponse.system.notFound);
    const result = await this.sequelize.query(`CALL subtract_money_from_main(:userIdParam, :pointsToSubtract, @resultMessage)`, {
      replacements: { userIdParam: dto.userId, pointsToSubtract: dto.points },
      type: 'RAW',
    });
    console.log('🚀 ~ UserPointService ~ result ~ result:', result);
    return result;
  }

  async findAll(userId: string) {
    const keyRedis = `data-game-point`;
    let allGamePoint: GamePointModel[] = null;
    const dataRedis = await this.cacheService.get(keyRedis);
    if (dataRedis) {
      allGamePoint = JSON.parse(dataRedis);
    } else {
      const dataDb = await this.gamePointService.findAll({ limit: 1000, offset: 0, page: 1 }, 'id', 'ASC');
      allGamePoint = dataDb.data;
      this.cacheService.set(keyRedis, JSON.stringify(allGamePoint));
    }
    const dataPoint = await Promise.all(allGamePoint.map((item) => this.userPointRepository.findOneByCondition({ gamePointId: item.id, userId }, ['points'])));
    const dataRes = allGamePoint.map((gamePoint, index) => {
      return {
        gamePointId: gamePoint.id,
        points: dataPoint[index] || 0,
      };
    });
    return dataRes;
  }

  async findByGame(userId: number, slug: string) {
    const { idGameSlug, idMain } = await this.gamePointService.findOneBySlugAndMain(slug);
    const [pointMain, pointGame] = await Promise.all([this.userPointRepository.findOneByCondition({ gamePointId: idMain, userId }, ['points']), this.userPointRepository.findOneByCondition({ gamePointId: idGameSlug, userId }, ['points'])]);
    return {
      mainPoint: pointMain.points,
      gamePoint: pointGame.points,
    };
  }

  async updatePoint(dto: MovePointToGameOtherDto) {
    if (!dto.userId) throw new Error(messageResponse.system.missingData);
    const checkDto = await Promise.all([this.userService.checkExist(dto.userId), this.gamePointService.checkExit(dto.gamePointTransfer), this.gamePointService.checkExit(dto.gamePointReceive)]);
    if (checkDto.includes(0)) throw new Error(messageResponse.system.notFound);
    const result = await this.sequelize.query(`CALL move_money_to_other_game(:userIdParam, :gamePointTransfer, :gamePointReceive, :pointsToTransfer)`, {
      replacements: { userIdParam: dto.userId, gamePointTransfer: dto.gamePointTransfer, gamePointReceive: dto.gamePointReceive, pointsToTransfer: dto.points },
      type: 'RAW',
    });
    return 'Move point successfully';
  }

  remove(id: number) {
    return `This action removes a #${id} userPoint`;
  }
}
