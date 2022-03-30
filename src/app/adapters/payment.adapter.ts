import { CallHandler, ExecutionContext, Injectable } from "@nestjs/common"
import { map, Observable } from "rxjs"
import { Payment } from "../entities/payment.entity"
import { PaymentOutput } from "../payments/dtos/payment-output.dto"
import * as moment from 'moment'

@Injectable()
export class PaymentAdapter {

	intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
	return next
		.handle()
		.pipe(map((data: Payment) => {
			return PaymentAdapter.toOutput(data)
		}))
	}

	static toOutput(payment: Payment): PaymentOutput {
		return {
			internalId: payment.id,
			externalId: payment.externalId,
			status: payment.status,
			amount: Number(payment.amount),
			expectedOn: payment.expectedOn ? moment(payment.expectedOn).format('DD-MM-YYYY') : undefined
		}
	}

}