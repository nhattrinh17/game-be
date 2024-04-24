import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Req } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { MovePointToGameOtherDto } from './dto/update-user-point.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('User Point')
@Controller('user-point')
export class UserPointController {
  constructor(private readonly userPointService: UserPointService) {}

  @Get()
  @ApiOperationCustom('User Point all game', 'get')
  findAll(@Req() req: any) {
    const user = req['user'];
    const userId = user?.id;
    return this.userPointService.findAll(userId);
  }

  @Get(':slug')
  @ApiOperationCustom('User Point Slug', 'get', true, true)
  findOne(@Param('slug') slug: string) {
    return this.userPointService.findByGame(slug);
  }

  @Post('')
  @ApiOperationCustom('User Point', 'POST')
  async updatePoint(@Body() dto: MovePointToGameOtherDto) {
    try {
      return await this.userPointService.updatePoint(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPointService.remove(+id);
  }
}
