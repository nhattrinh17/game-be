import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { UserPointService } from './user-point.service';
import { MovePointToGameOtherDto } from './dto/update-user-point.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('User Point')
@Controller('user-point')
export class UserPointController {
  constructor(private readonly userPointService: UserPointService) {}

  @Get()
  findAll() {
    return this.userPointService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPointService.findOne(+id);
  }

  @Post('')
  @ApiOperationCustom('User Point', 'POST')
  updatePoint(@Body() dto: MovePointToGameOtherDto) {
    try {
      return this.userPointService.updatePoint(dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPointService.remove(+id);
  }
}
