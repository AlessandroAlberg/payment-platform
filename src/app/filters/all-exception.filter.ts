
import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { LoggerService } from '../logger/logger.service'
import * as ErrorType from './constants/error-type-constants'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {

    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.contextName = AllExceptionFilter.name
    }

    /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
    catch(exception: any, host: ArgumentsHost): void {
        this.loggerService.error(`Called method: #${this.catch.name}()`)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const message = exception?.response?.data?.message ?? exception?.message

        this.loggerService.error(`Message Error: #${message}()`)

        const status = HttpStatus.INTERNAL_SERVER_ERROR

        this.loggerService.error(`Exception: ${JSON.stringify(exception)}`)
        this.loggerService.error(`Stack: ${JSON.stringify(exception.stack)}`)
        const internalMessageError = 'Error interno no serviço de transferência'

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: {
                type: ErrorType.generic,
                code: status,
                message: internalMessageError
            }
        })
    }
}