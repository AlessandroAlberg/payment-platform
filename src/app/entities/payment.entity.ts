import { Column, Entity, Index } from "typeorm"
import { RootEntity } from "./root.entity"

export enum PaymentType {
	Credit = 'credit',
	Debit = 'debit',
	Boleto = 'boleto',
	Pix = 'pix',
	ThreeDes = '3des',
	ApplePay = 'apple_pay',
	GooglePay = 'google_pay'
}

export interface PaymentMethod {
    readonly paymentType: PaymentType
}

export enum StatusPayment {
	Created = 'CREATED',
	Approved = 'APPROVED',
	Scheduled = 'SCHEDULED',
	Rejected = 'REJECTED'
}
  
@Entity({
	name: "payment",
})
export class Payment extends RootEntity {

	@Column({
		type: 'varchar',
		name: 'external_id',
	})
	public externalId!: string

	@Column({
        type: 'enum',
        enum: StatusPayment,
        nullable: false
    })
    public status = StatusPayment.Created

	@Column("decimal", {
        nullable: true,
    })
    public amount!: number

	@Column({
        type: 'date',
        name: 'expected_on',
        nullable: true
    })
    public expectedOn?: Date
}