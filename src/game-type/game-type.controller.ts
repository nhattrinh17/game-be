import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { GameTypeService } from './game-type.service';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Game Type')
@Controller('game-type')
export class GameTypeController {
  constructor(private readonly gameTypeService: GameTypeService) {}

  @Post()
  @ApiOperationCustom('Game Type', 'Post')
  create(@Body() createGameTypeDto: CreateGameTypeDto) {
    return this.gameTypeService.create(createGameTypeDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    type: String,
  })
  @ApiOperationCustom('Game Type', 'Get')
  findAll(@Req() req: any, @Query('status') status: string, @Query('search') search: string, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.gameTypeService.findAll(search, pagination, status, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Game Type', 'Get', true, true)
  findOne(@Param('id') id: string) {
    return this.gameTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Game Type', 'Patch')
  update(@Param('id') id: string, @Body() updateGameTypeDto: UpdateGameTypeDto) {
    return this.gameTypeService.update(+id, updateGameTypeDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Game Type', 'Delete')
  remove(@Param('id') id: string) {
    return this.gameTypeService.remove(+id);
  }
}
