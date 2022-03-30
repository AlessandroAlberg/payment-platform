import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsUUID, IsOptional, IsNumber, IsEnum} from 'class-validator'
import { StatusPayment } from '../../entities'

export class CreatePaymentDto {

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly externalId: string

  @ApiProperty()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @IsOptional({ always: true })
  readonly amount!: number

  @ApiProperty({ example: "dd-mm-yyyy" })
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly expectedOn: string

}

export class CreatePaymentOutput {

  @ApiProperty()
  @IsUUID('4')
  @IsNotEmpty({always: true})
  @IsString({always: true})
  readonly internalId: string

  @ApiProperty()
  @IsEnum(StatusPayment)
  @IsNotEmpty({ always: true })
  readonly status: StatusPayment

}