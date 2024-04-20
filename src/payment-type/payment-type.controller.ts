import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, Search, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentTypeService } from './payment-type.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { UpdatePaymentTypeDto } from './dto/update-payment-type.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Payment Type')
@Controller('payment-type')
export class PaymentTypeController {
  constructor(private readonly paymentTypeService: PaymentTypeService) {}

  @Post()
  @ApiOperationCustom('Payment Type', 'POST')
  async create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    try {
      return await this.paymentTypeService.create(createPaymentTypeDto);
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
  @ApiOperationCustom('Payment Type', 'GET')
  findAll(@Req() req: any, @Query('search') search: string, @Query('status') status: string, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.paymentTypeService.findAll(search, pagination, sort, status);
  }

  @Get(':id')
  @ApiOperationCustom('Payment Type', 'GET', true, true)
  findOne(@Param('id') id: string) {
    return this.paymentTypeService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Payment Type', 'patch')
  async update(@Param('id') id: string, @Body() updatePaymentTypeDto: UpdatePaymentTypeDto) {
    try {
      return await this.paymentTypeService.update(+id, updatePaymentTypeDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Payment Type', 'delete')
  async remove(@Param('id') id: string) {
    try {
      return await this.paymentTypeService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
