import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { StatusPayment } from '../../entities'

export enum StatusForUpdate {
    Approved = 'APPROVED',
	Scheduled = 'SCHEDULED',
	Rejected = 'REJECTED'
}


export abstract class UpdatePaymentDto {
    
    @ApiProperty({ enum: StatusForUpdate })
    @IsEnum(StatusForUpdate)
    @IsNotEmpty({ always: true })
    readonly status: StatusPayment
    
}

export abstract class UpdatePaymentOutput {
    
    @ApiProperty()
    @IsUUID('4')
    @IsNotEmpty({always: true})
    @IsString({always: true})
    readonly id: string
    
}