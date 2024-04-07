import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Group')
@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperationCustom('Group', 'Post')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    description: 'User name hoặc email',
  })
  @ApiQuery({
    name: 'status',
    description: 'Trạng thái account',
  })
  @ApiQuery({
    name: 'sort',
    description: 'Trạng thái account',
  })
  @BaseFilter()
  @ApiOperationCustom('Group', 'Get')
  findAll(@Req() req, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    return this.groupService.findAll(req['pagination'], search, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Group', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Group', 'Patch')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Group', 'Delete')
  remove(@Param('id') id: string) {
    return this.groupService.remove(+id);
  }
}
