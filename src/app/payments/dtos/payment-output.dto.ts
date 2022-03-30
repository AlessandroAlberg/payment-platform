import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsEnum} from 'class-validator'
import { StatusPayment } from '../../entities'

export class PaymentOutput {

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly internalId: string

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly externalId: string

  @ApiProperty({enum: StatusPayment})
  @IsEnum(StatusPayment)
  @IsNotEmpty({ always: true })
  readonly status: StatusPayment

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional({ always: true })
  readonly amount!: number

  @ApiProperty()
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly expectedOn: string

}
