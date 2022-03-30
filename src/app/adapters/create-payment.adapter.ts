import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common"
import * as moment from 'moment'
import { map, Observable } from "rxjs"
import { Payment } from "../entities/payment.entity"
import { CreatePaymentDto, CreatePaymentOutput } from "../payments/dtos/create-payment.dto"

@Injectable()
export class CreatePaymentAdapter {

	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
	return next
		.handle()
		.pipe(map((data: Payment) => {
			return CreatePaymentAdapter.toOutput(data)
		}))
	}

	static toDomain(paymentDto: CreatePaymentDto): Payment {
		const payment = new Payment()
		payment.externalId = paymentDto.externalId
		payment.amount = paymentDto.amount
		payment.expectedOn = moment(paymentDto.expectedOn, "DD-MM-YYYY").toDate()
		return payment
	}

	static toOutput(payment: Payment): CreatePaymentOutput {
		return  {
			internalId: payment.id,
			status: payment.status
		}
	}
}