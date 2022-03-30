
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError'

import { LoggerService } from '../logger/logger.service'
import * as ErrorType from './constants/error-type-constants'


@Catch(EntityNotFoundError)
export class EntityNotFoundExceptionFilter implements ExceptionFilter {

    constructor(private readonly loggerService: LoggerService) {
        this.loggerService.contextName = EntityNotFoundExceptionFilter.name
    }

    public catch(exception: EntityNotFoundError, host: ArgumentsHost) {

        this.loggerService.error(`Called method: #${this.catch.name}()`)

        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()  

        const message = 'Recurso não encontrado'
        const stack = exception?.stack
        
        this.loggerService.error(`Message Error: #${message}`)
        this.loggerService.error(`Stack: #${JSON.stringify(stack)}`)
        const status = HttpStatus.NOT_FOUND
        
        response.status(status).json({
            error: [{
                type: ErrorType.entityNotFound,
                code: status,
                message
            }]
        })
    }
}