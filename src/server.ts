import mongoose from 'mongoose'
import config from './config'
import app from './app'
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    // eslint-disable-next-line no-console
    console.log(`Database is connected successfully`)

    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Failed to connect database`, err)
  }
}

bootstrap()
