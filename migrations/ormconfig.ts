import { ConnectionOptions } from 'typeorm'

const config: ConnectionOptions = {
    'type': 'postgres',
    'host': process.env.TYPEORM_HOST,
    'port': +process.env.TYPEORM_PORT,
    'username': process.env.TYPEORM_USERNAME,
    'password': process.env.TYPEORM_PASSWORD,
    'database': process.env.TYPEORM_DATABASE,
    'synchronize': false,
    'logging': true,
    'entities': [
        'src/app/entities/**/*.ts'
    ],
    'migrations': [
        'migrations/**/*.ts'
    ],
    'cli': {
        'migrationsDir': 'migrations'
    }
}

export = config;
