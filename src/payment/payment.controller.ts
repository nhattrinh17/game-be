import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperationCustom('Payment', 'post')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    try {
      return await this.paymentService.create(createPaymentDto);
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
    name: 'paymentTypeId',
    type: String,
  })
  @ApiOperationCustom('Payment', 'GET')
  findAll(@Req() req: any, @Query('paymentTypeId') paymentTypeId: string, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    const pagination = req['pagination'];
    return this.paymentService.findAll(pagination, +paymentTypeId, sort, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Payment', 'get', true, true)
  async findOne(@Param('id') id: string) {
    try {
      return await this.paymentService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperationCustom('Payment', 'patch')
  async update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    try {
      return await this.paymentService.update(+id, updatePaymentDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Payment', 'delete')
  async remove(@Param('id') id: string) {
    try {
      return await this.paymentService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
