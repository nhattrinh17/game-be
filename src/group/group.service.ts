import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { GroupModel } from 'src/model';
import { messageResponse } from 'src/constants';
import { Pagination } from 'src/middlewares';
import { Op } from 'sequelize';

@Injectable()
export class GroupService {
  constructor(@InjectModel(GroupModel) private readonly groupModel: typeof GroupModel) {}

  async create(dto: CreateGroupDto) {
    if (!dto.name) throw new HttpException(messageResponse.group.missingData, HttpStatus.BAD_REQUEST);
    const checkExit = await this.groupModel.findOne({ where: { name: dto.name } });
    if (checkExit) throw new HttpException(messageResponse.group.duplicate, HttpStatus.BAD_REQUEST);
    return this.groupModel.create({ ...dto });
  }

  async findAll(pagination: Pagination, search: string, status: string, sort?: any) {
    const filter: any = {};
    if (search) filter.name = { [Op.like]: `%${search.trim()}%` };
    if (status) filter.status = status;
    const promise1 = this.groupModel.count({ where: filter });
    console.log('🚀 ~ file: user.service.ts:32 ~ UserService ~ findAll ~ filter:', JSON.stringify(filter));
    const promise2 = this.groupModel.findAll({
      //
      where: filter,
      order: sort ? [sort, 'DESC'] : ['id', 'DESC'],
      offset: pagination.offset,
      limit: pagination.limit,
    });
    const [countDocument, data] = await Promise.all([promise1, promise2]);
    return {
      pagination: { limit: pagination.limit, page: pagination.page, total: countDocument },
      data,
    };
  }

  findOne(id: number) {
    return this.groupModel.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateGroupDto) {
    const groupById = await this.findOne(id);
    if (!groupById) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    if (groupById.name != dto.name) {
      const checkExit = await this.groupModel.findOne({ where: { name: dto.name } });
      if (checkExit) throw new HttpException(messageResponse.group.duplicate, HttpStatus.BAD_REQUEST);
    }
    return this.groupModel.update({ ...dto }, { where: { id } });
  }

  async remove(id: number) {
    const group = await this.findOne(id);
    if (!group) throw new HttpException(messageResponse.blog.notFound, HttpStatus.BAD_REQUEST);
    const dataUpdate = { isDeleted: true, deletedAt: new Date() };
    return this.groupModel.update(dataUpdate, { where: { id } });
  }
}
