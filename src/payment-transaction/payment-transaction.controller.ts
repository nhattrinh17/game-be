import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { PaymentTransactionService } from './payment-transaction.service';
import { CreatePaymentTransactionDto } from './dto/create-payment-transaction.dto';
import { UpdateStatusPaymentTransactionDto } from './dto/update-payment-transaction.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Payment Transaction ')
@Controller('payment-transaction')
export class PaymentTransactionController {
  constructor(private readonly paymentTransactionService: PaymentTransactionService) {}

  @Post()
  create(@Body() createPaymentTransactionDto: CreatePaymentTransactionDto) {
    return this.paymentTransactionService.create(createPaymentTransactionDto);
  }

  @Get()
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
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiOperationCustom('Payment transaction ', 'GET')
  findAll(@Req() req: any, @Query('userId') userId: string, @Query('type') type: string, @Query('status') status: number, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.paymentTransactionService.findAll(pagination, +userId, type, status, sort);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentTransactionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStatusPaymentTransactionDto) {
    return this.paymentTransactionService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentTransactionService.remove(+id);
  }
}
