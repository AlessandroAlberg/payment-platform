import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { LoggerService } from '../logger/logger.service'

import * as ErrorType from './constants/error-type-constants'

@Catch()
export class BusinessErrorExceptionFilter implements ExceptionFilter {

    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.contextName = BusinessErrorExceptionFilter.name
    }

    public catch(exception: any, host: ArgumentsHost) {

        this.loggerService.error(`Called method: #${this.catch.name}()`)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const message = exception?.response?.data?.message ?? exception?.message

        this.loggerService.error(`Message Error: #${message}()`)

        const status = HttpStatus.METHOD_NOT_ALLOWED

        this.loggerService.error(`Exception: ${JSON.stringify(exception)}`)
        this.loggerService.error(`Stack: ${JSON.stringify(exception.stack)}`)
        const internalMessageError = 'Error de negócio'
        
        response.status(status).json({
            error: {
                type: ErrorType.generic,
                code: status,
                message: internalMessageError
            }
        })
    }
}