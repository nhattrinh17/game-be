import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { GameTypeService } from './game-type.service';
import { CreateGameTypeDto } from './dto/create-game-type.dto';
import { UpdateGameTypeDto } from './dto/update-game-type.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('game-type')
export class GameTypeController {
  constructor(private readonly gameTypeService: GameTypeService) {}

  @Post()
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
  findAll(@Req() req: any, @Query('status') status: string, @Query('search') search: string, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.gameTypeService.findAll(search, pagination, status, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGameTypeDto: UpdateGameTypeDto) {
    return this.gameTypeService.update(+id, updateGameTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gameTypeService.remove(+id);
  }
}
