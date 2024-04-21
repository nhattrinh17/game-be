import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { GamePointService } from './game-point.service';
import { CreateGamePointDto } from './dto/create-game-point.dto';
import { UpdateGamePointDto } from './dto/update-game-point.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Game Point')
@Controller('game-point')
export class GamePointController {
  constructor(private readonly gamePointService: GamePointService) {}

  @Post()
  @ApiOperationCustom('Game Point', 'POST')
  async create(@Body() createGamePointDto: CreateGamePointDto) {
    try {
      return await this.gamePointService.create(createGamePointDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @BaseFilter()
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiQuery({
    name: 'typeSort',
    type: String,
  })
  @ApiOperationCustom('Game Point', 'Get')
  async findAll(@Req() req: any, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    const pagination = req['pagination'];
    try {
      return await this.gamePointService.findAll(pagination, sort, typeSort);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  @ApiOperationCustom('Game Point', '')
  findOne(@Param('id') id: string) {
    return this.gamePointService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGamePointDto: UpdateGamePointDto) {
    try {
      return await this.gamePointService.update(+id, updateGamePointDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.gamePointService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
