import { AppDataSource } from 'src/config/app_data_source'

AppDataSource.initialize().then(async () => {
  const app = (await import('../../config/app')).default
  app.listen(process.env.PORT_SERVER, () => { console.log(`Running in port ${process.env.PORT_SERVER}`) })
}).catch(console.error)
