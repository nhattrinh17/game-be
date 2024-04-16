import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Req } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOperationCustom } from 'src/custom-decorator';

@ApiTags('Payment')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post()
  @ApiOperationCustom('Payment', 'post')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentService.create(createPaymentDto);
  }

  @Get()
  @ApiQuery({
    name: 'search',
    type: String,
  })
  @ApiQuery({
    name: 'paymentTypeId',
    type: String,
  })
  @ApiQuery({
    name: 'sort',
    type: String,
  })
  @ApiOperationCustom('Payment', 'GET')
  findAll(@Req() req: any, @Query('search') search: string, @Query('paymentTypeId') paymentTypeId: string, @Query('sort') sort: string) {
    const pagination = req['pagination'];
    return this.paymentService.findAll(search, pagination, +paymentTypeId, sort);
  }

  @Get(':id')
  @ApiOperationCustom('Payment', 'get', true, true)
  findOne(@Param('id') id: string) {
    return this.paymentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperationCustom('Payment', 'patch')
  update(@Param('id') id: string, @Body() updatePaymentDto: UpdatePaymentDto) {
    return this.paymentService.update(+id, updatePaymentDto);
  }

  @Delete(':id')
  @ApiOperationCustom('Payment', 'delete')
  remove(@Param('id') id: string) {
    return this.paymentService.remove(+id);
  }
}
