/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { QueryFailedError } from 'typeorm'
import { LoggerService } from '../logger/logger.service'

import * as ErrorType from './constants/error-type-constants'


@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {

    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.contextName = QueryFailedExceptionFilter.name
    }

    public catch(exception: QueryFailedError, host: ArgumentsHost) {

        this.loggerService.error(`Called method: #${this.catch.name}()`)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()  

        const message = 'Error interno no serviço de transferência'
        const stack = exception?.stack
        
        this.loggerService.error(`Message Error: #${message}`)
        this.loggerService.error(`Stack: #${JSON.stringify(stack)}`)

        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: [{
                type: ErrorType.databaseFailed,
                code: HttpStatus.INTERNAL_SERVER_ERROR,
                message
            }]
        })
    }
}