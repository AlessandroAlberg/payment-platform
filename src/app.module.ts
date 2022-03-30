import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { APP_FILTER } from '@nestjs/core'
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { env } from 'process'
import { AllExceptionFilter } from './app/filters/all-exception.filter'
import { BadRequestExceptionFilter } from './app/filters/bad-request-exception.filter'
import { EntityNotFoundExceptionFilter } from './app/filters/entity-not-found-exception'
import { QueryFailedExceptionFilter } from './app/filters/query-failed-exception.filter'
import { LoggerModule } from './app/logger/logger.module'
import { PaymentsModule } from './app/payments/payments.module'
import databaseConfig from './config/environments/database.config'


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({ load: [databaseConfig] })],
      useFactory: (configDatabase: ConfigType<typeof databaseConfig>): TypeOrmModuleOptions => ({
        host: configDatabase.host,
        type: configDatabase.type,
        port: configDatabase.port,
        username: configDatabase.username,
        password: configDatabase.password,
        database: configDatabase.database,
        logging: process.env.NODE_ENV === 'development',
        autoLoadEntities: true,
      }),
      inject: [databaseConfig.KEY],
    }),
    PaymentsModule,
    LoggerModule,
  ],
  providers: [
    {
        provide: APP_FILTER,
        useClass: AllExceptionFilter
    },
    {
        provide: APP_FILTER,
        useClass: EntityNotFoundExceptionFilter
    },
    {
        provide: APP_FILTER,
        useClass: BadRequestExceptionFilter
    },
    {
        provide: APP_FILTER,
        useClass: QueryFailedExceptionFilter
    },
  ]
})
export class AppModule { }
