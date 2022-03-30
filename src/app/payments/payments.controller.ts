import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  Patch
} from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { PaymentsService } from './payments.service'
import { CreatePaymentDto, CreatePaymentOutput } from './dtos/create-payment.dto'
import { UpdatePaymentDto, UpdatePaymentOutput } from './dtos/update-payment.dto'
import { LoggerService } from '../logger/logger.service'
import { PaymentAdapter } from '../adapters/payment.adapter'
import { Payment } from '../entities'
import { CreatePaymentAdapter } from '../adapters/create-payment.adapter'
import { PaymentOutput } from './dtos/payment-output.dto'


@ApiTags('payments')
@Controller({
  path: 'paymentsOrders',
  version: '1',
})
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService,
              private readonly logger: LoggerService) {}

  @ApiCreatedResponse({
    type: CreatePaymentOutput
  })
  @Post()
  @UseInterceptors(CreatePaymentAdapter)
  create(
    @Body() createPaymentDto: CreatePaymentDto): Promise<Payment>  {
    this.logger.info(`Calling #${this.create.name}`)

    return this.paymentsService.create(createPaymentDto)
  }

  @ApiOkResponse({
    type: PaymentOutput
  })
  @Get(':internalId')
  @UseInterceptors(PaymentAdapter)
  async findOne(@Param('internalId') id: string): Promise<Payment> {
    this.logger.info(`Calling #${this.create.name}`)
    await this.paymentsService.update(id, { status: 'APPROVED' } as UpdatePaymentDto)
    return this.paymentsService.findOneByPaymentId(id)
  }

  @ApiOkResponse({
    type: UpdatePaymentOutput
  })
  @Patch('internal/:internalId')
  update(@Param('internalId') id: string, @Body() updatePaymentDto: UpdatePaymentDto): Promise<UpdatePaymentOutput> {
    this.logger.info(`Calling #${this.create.name}`)
    
    return this.paymentsService.update(id, updatePaymentDto)
  }

}
