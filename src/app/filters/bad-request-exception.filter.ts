import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { LoggerService } from '../logger/logger.service'

import * as ErrorType from './constants/error-type-constants'

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {

    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.contextName = BadRequestExceptionFilter.name
    }

    public catch(exception: any, host: ArgumentsHost) {

        this.loggerService.error(`Called method: #${this.catch.name}()`)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()  

        const message = exception.message
        const stack = exception?.stack
        const details = exception.response.message
        
        this.loggerService.error(`Message Error: #${message}`)
        this.loggerService.error(`Stack: #${JSON.stringify(stack)}`)
        const status = HttpStatus.BAD_REQUEST
        
        response.status(status).json({
            error: {
                type: ErrorType.badRequest,
                code: status,
                message: exception.message,
                details
            }
        })
    }
}