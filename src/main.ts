import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import helmet from 'helmet'
import { AppModule } from './app.module'


async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = await app.resolve(ConfigService)


    app.useGlobalPipes(new ValidationPipe({
        transform: false,
        validateCustomDecorators: false,
        whitelist: true,
        forbidNonWhitelisted: true
    }))

    app.setGlobalPrefix('v1')

    app.use(helmet())

  const config = new DocumentBuilder()
    .setTitle('Payments Plataform')
    .setDescription('List - Edit - Remove - Get / API for payments')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)

  const port = configService.get<string>('HTTP_PORT') ?? 3000

  await app.listen(port)
}

bootstrap()
