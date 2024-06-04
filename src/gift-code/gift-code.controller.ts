import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { GiftCodeService } from './gift-code.service';
import { CreateGiftCodeDto } from './dto/create-gift-code.dto';
import { SubmitGiftCodeDto, UpdateGiftCodeDto } from './dto/update-gift-code.dto';
import { BaseFilter } from 'src/custom-decorator';
import { ApiQuery } from '@nestjs/swagger';

@Controller('gift-code')
export class GiftCodeController {
  constructor(private readonly giftCodeService: GiftCodeService) {}

  @Post()
  create(@Req() req: any, @Body() dto: CreateGiftCodeDto) {
    const user = req.user;
    dto.userIdCreate = user.id;
    return this.giftCodeService.create(dto);
  }

  @Get()
  @BaseFilter()
  @ApiQuery({
    name: 'status',
    type: Number,
  })
  @ApiQuery({
    name: 'userIdUse',
    type: Number,
  })
  findAll(@Req() req: any, @Query('status') status: number, @Query('userIdUse') userIdUse: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    const pagination = req['pagination'];
    return this.giftCodeService.findAll(status, userIdUse, pagination, sort, typeSort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftCodeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateGiftCodeDto) {
    const user = req.user;
    dto.userIdUse = user.id;
    try {
      const res = await this.giftCodeService.updateStatus(+id, dto);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('submit')
  async submitGift(@Req() req: any, @Body() dto: SubmitGiftCodeDto) {
    const user = req.user;
    dto.userIdUse = user.id;
    try {
      const res = await this.giftCodeService.handleGiftCodeUser(dto);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftCodeService.remove(+id);
  }
}
