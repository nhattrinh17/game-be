import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { GiftCodeService } from './gift-code.service';
import { CreateGiftCodeDto } from './dto/create-gift-code.dto';
import { UpdateGiftCodeDto } from './dto/update-gift-code.dto';
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
    return this.giftCodeService.findAll(status, pagination, sort, typeSort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.giftCodeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGiftCodeDto: UpdateGiftCodeDto) {
    return this.giftCodeService.updateStatus(+id, updateGiftCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.giftCodeService.remove(+id);
  }
}
