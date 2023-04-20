import 'reflect-metadata'
import 'dotenv/config'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.USER_DB,
  password: process.env.PASS_DB,
  database: process.env.NAME_DB,
  synchronize: false,
  subscribers: [],
  migrations: ['src/modules/**/migration/**.{ts,js}'],
  entities: ['src/modules/**/model/**.{ts,js}']
})
