import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorLogger } from './shared/logger';
import { Server } from 'http';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});
let server: Server;

async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string);
    // eslint-disable-next-line no-console
    logger.info(`Database is connected successfully`);

    server = app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      logger.info(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    errorLogger.error(`Failed to connect database`, err);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
