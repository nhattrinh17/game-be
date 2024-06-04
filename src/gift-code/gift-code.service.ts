import { Inject, Injectable } from '@nestjs/common';
import { CreateGiftCodeDto } from './dto/create-gift-code.dto';
import { SubmitGiftCodeDto, UpdateGiftCodeDto } from './dto/update-gift-code.dto';
import { GiftCodeRepositoryInterface } from './interface/gift-code.interface';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from 'src/middlewares';
import { UserModel } from 'src/model';
import { StatusGiftCode, messageResponse } from 'src/constants';
import { UserPointService } from 'src/user-point/user-point.service';

@Injectable()
export class GiftCodeService {
  constructor(
    @Inject('GiftCodeRepositoryInterface') private giftCodeRepository: GiftCodeRepositoryInterface,
    private readonly userPointService: UserPointService,
  ) {}

  async create(dto: CreateGiftCodeDto) {
    console.log('🚀 ~ GiftCodeService ~ create ~ dto:', dto);
    const dataBulk = Array.from({ length: dto.totalCode }, (x) => x).map((i) => {
      const giftCode = uuidv4();
      return {
        code: giftCode,
        ...dto,
      };
    });
    console.log('🚀 ~ GiftCodeService ~ dataBulk ~ dataBulk:', dataBulk);
    await this.giftCodeRepository.createBulk(dataBulk);
    return 'Create gift code successfully';
  }

  findAll(status: number, userIdUse: number, pagination: Pagination, sort: string, typeSort: string) {
    const filter: any = {};
    if (status >= 0) filter.status = status;
    if (userIdUse > 0) filter.userIdUse = userIdUse;

    return this.giftCodeRepository.findAll(filter, {
      sort,
      typeSort,
      ...pagination,
      projection: ['id', 'code', 'name', 'point', 'timeUse', 'status', 'createdAt'],
      include: [
        {
          model: UserModel,
          as: 'userCreate',
          attributes: ['username'], // Chỉ lấy ra id, username và email từ bảng user
        },
        {
          model: UserModel,
          as: 'userUse',
          attributes: ['username'],
        },
      ],
    });
  }

  findOne(id: number) {
    return this.giftCodeRepository.findOneById(id);
  }

  async updateStatus(id: number, dto: UpdateGiftCodeDto) {
    const giftCode = await this.giftCodeRepository.findOneById(id);
    if (giftCode) {
      if (giftCode.status != StatusGiftCode.Created) throw new Error(messageResponse.giftCode.cannotUse);
      // if (dto.status == StatusGiftCode.Used) {
      //   await this.userPointService.addPointToMainPoint({
      //     description: `Nhận thưởng từ gift code ${giftCode.name}`,
      //     points: giftCode.point,
      //     userId: dto.userIdUse,
      //   });
      //   giftCode.userIdUse = dto.userIdUse;
      //   giftCode.status = dto.status;
      //   giftCode.timeUse = new Date();
      // }
      giftCode.status = dto.status;
      return giftCode.save();
    }
    throw new Error(messageResponse.system.idInvalid);
  }

  async handleGiftCodeUser(dto: SubmitGiftCodeDto) {
    const giftCode = await this.giftCodeRepository.findOneByCondition({ code: dto.code });
    if (!giftCode) throw new Error(messageResponse.giftCode.codeInvalid);
    if (giftCode.status != StatusGiftCode.Created) throw new Error(messageResponse.giftCode.cannotUse);
    await this.userPointService.addPointToMainPoint({
      description: `Nhận thưởng từ gift code ${giftCode.name}`,
      points: giftCode.point,
      userId: dto.userIdUse,
    });
    giftCode.userIdUse = dto.userIdUse;
    giftCode.status = StatusGiftCode.Used;
    giftCode.timeUse = new Date();
    return giftCode.save();
  }

  remove(id: number) {
    return this.giftCodeRepository.softDelete(id);
  }
}
