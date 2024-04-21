import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @ApiOperationCustom('Bank', 'post')
  async create(@Body() createBankDto: CreateBankDto) {
    try {
      return await this.bankService.create(createBankDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @BaseFilter()
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
  @ApiOperationCustom('Bank', 'GET')
  findAll(@Req() req: any, @Query('search') search: string, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.bankService.findAll(search, pagination, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Bank', 'GET', true, true)
  findOne(@Param('id') id: string) {
    return this.bankService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Bank', 'patch')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    try {
      return await this.bankService.update(+id, updateBankDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Bank', 'delete')
  async remove(@Param('id') id: string) {
    try {
      return await this.bankService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
