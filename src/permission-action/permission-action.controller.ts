import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionActionService } from './permission-action.service';
import { CreatePermissionActionDto } from './dto/create-permission-action.dto';
import { UpdatePermissionActionDto } from './dto/update-permission-action.dto';

@Controller('permission-action')
export class PermissionActionController {
  constructor(private readonly permissionActionService: PermissionActionService) {}

  @Post()
  create(@Body() createPermissionActionDto: CreatePermissionActionDto) {
    return this.permissionActionService.create(createPermissionActionDto);
  }

  @Get()
  findAll() {
    return this.permissionActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionActionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionActionDto: UpdatePermissionActionDto) {
    return this.permissionActionService.update(+id, updatePermissionActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionActionService.remove(+id);
  }
}
