import { Injectable } from '@nestjs/common';
import { CreatePermissionActionDto } from './dto/create-permission-action.dto';
import { UpdatePermissionActionDto } from './dto/update-permission-action.dto';

@Injectable()
export class PermissionActionService {
  create(createPermissionActionDto: CreatePermissionActionDto) {
    return 'This action adds a new permissionAction';
  }

  findAll() {
    return `This action returns all permissionAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionAction`;
  }

  update(id: number, updatePermissionActionDto: UpdatePermissionActionDto) {
    return `This action updates a #${id} permissionAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionAction`;
  }
}
