import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreatePaymentAdapter } from '../adapters/create-payment.adapter'
import { Payment } from '../entities/payment.entity'
import { LoggerService } from '../logger/logger.service'
import { dueDateChecker } from '../utils/dueDateChecker'
import { CreatePaymentDto } from './dtos/create-payment.dto'
import { UpdatePaymentDto, UpdatePaymentOutput } from './dtos/update-payment.dto'

@Injectable()
export class PaymentsService {

  constructor(
        @InjectRepository(Payment)
        private readonly PaymentRepository: Repository<Payment>,
        private readonly loggerService: LoggerService,
  ) {
    this.loggerService.contextName = this.constructor.name
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    this.loggerService.info(`Calling #${this.create.name}`)
    const payment = CreatePaymentAdapter.toDomain(createPaymentDto)

    if (dueDateChecker(payment.expectedOn)) 
     throw new BadRequestException(`Data de vencimento expirada`)

    return this.PaymentRepository.save(payment)
  }

  async findOneByPaymentId(id: string): Promise<Payment> {
    this.loggerService.info(`Calling #${this.create.name}`)
    return this.PaymentRepository.findOneOrFail({ where: { id } })
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto): Promise<UpdatePaymentOutput> {
    this.loggerService.info(`Calling #${this.update.name}`)
    const payment = await this.findOneByPaymentId(id)

    await this.PaymentRepository.update({ id: payment.id }, updatePaymentDto)

    return { id }
  }

}
