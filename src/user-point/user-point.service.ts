import { Inject, Injectable } from '@nestjs/common';
import { AddPointToMainPointDto } from './dto/create-user-point.dto';
import { MovePointToGameOtherDto } from './dto/update-user-point.dto';
import { UserPointRepositoryInterface } from './interface/user-point.interface';
import { UserService } from 'src/user/user.service';
import { GamePointService } from 'src/game-point/game-point.service';
import { messageResponse } from 'src/constants';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UserPointService {
  constructor(
    @Inject('UserPointRepositoryInterface') private userPointRepository: UserPointRepositoryInterface,
    private readonly userService: UserService,
    private readonly gamePointService: GamePointService,
    private readonly sequelize: Sequelize,
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

  findAll() {
    return `This action returns all userPoint`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPoint`;
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
