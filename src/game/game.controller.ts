import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  @ApiOperationCustom('Game', 'Post')
  async create(@Body() createGameDto: CreateGameDto) {
    try {
      return await this.gameService.create(createGameDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiQuery({
    name: 'typeSort',
    type: String,
  })
  @ApiOperationCustom('Game', 'GET')
  findAll(@Req() req: any, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    const pagination = req['pagination'];
    return this.gameService.findAll(search, pagination, sort, status, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Game', 'GET', true, true)
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Game', 'patch')
  async update(@Param('id') id: string, @Body() updateGameDto: UpdateGameDto) {
    try {
      return await this.gameService.update(+id, updateGameDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Game', 'delete')
  async remove(@Param('id') id: string) {
    try {
      return await this.gameService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
