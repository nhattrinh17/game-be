import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { AddReceiptDto, UpdateStatusPaymentTransactionDto } from './dto/update-payment-transaction.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom, BaseFilter } from 'src/custom-decorator';

@ApiTags('Payment Transaction ')
@Controller('payment-transaction')
export class PaymentTransactionController {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}

  @Post()
  async create(@Body() createPaymentTransactionDto: CreatePaymentTransactionDto) {
    try {
      return await this.paymentTransactionService.create(createPaymentTransactionDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @BaseFilter()
  @ApiQuery({
    name: 'userId',
    type: String,
  })
  @ApiQuery({
    name: 'type',
    type: String,
  })
  @ApiQuery({
    name: 'status',
    type: Number,
  })
  @ApiOperationCustom('Payment transaction ', 'GET')
  findAll(@Req() req: any, @Query('userId') userId: string, @Query('type') type: string, @Query('status') status: number, @Query('sort') sort: string, @Query('typeSort') typeSort: string) {
    const pagination = req['pagination'];
    return this.paymentTransactionService.findAll(pagination, +userId, type, status, sort, typeSort);
  }

  @Get(':id')
  @ApiOperationCustom('Payment transaction ', 'GET', true, true)
  async findOne(@Param('id') id: string) {
    try {
      return await this.paymentTransactionService.findOne(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id')
  @ApiOperationCustom('Payment transaction ', 'patch')
  async update(@Param('id') id: string, @Body() dto: UpdateStatusPaymentTransactionDto) {
    try {
      return await this.paymentTransactionService.update(+id, dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch(':id/receipt')
  @ApiOperationCustom('Payment transaction (thêm biên lai) ', 'patch')
  async addReceipt(@Param('id') id: string, @Body() dto: AddReceiptDto) {
    try {
      return await this.paymentTransactionService.addReceiptPaymentTransaction(+id, dto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':id')
  @ApiOperationCustom('Payment transaction ', 'delete')
  async remove(@Param('id') id: string) {
    try {
      return await this.paymentTransactionService.remove(+id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
