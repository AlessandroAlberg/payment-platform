import { Module } from '@nestjs/common'
import { PaymentsService } from './payments.service'
import { PaymentsController } from './payments.controller'
import { LoggerModule } from '../logger/logger.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Payment } from '../entities/payment.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    LoggerModule,
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})

export class PaymentsModule {}
