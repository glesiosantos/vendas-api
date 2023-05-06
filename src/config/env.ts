import 'dotenv/config'

export default {
  apiSecret: '6e6af71ba1c48cb464ed6a0d4836499f',
  dbUsername: process.env.USER_DB,
  dbPassword: process.env.PASS_DB,
  dbName: process.env.NAME_DB,
  apiExpiresIn: '1d'
}
