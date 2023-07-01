import 'reflect-metadata'
import { DataSource } from 'typeorm'
import env from './env'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: env.dbUsername,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: false,
  subscribers: [],
  migrations: ['src/modules/**/migration/**.{ts,js}'],
  entities: ['src/modules/**/model/**.{ts,js}']
})
