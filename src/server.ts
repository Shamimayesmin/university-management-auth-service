/* eslint-disable no-undef */
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';
process.on('uncaughtException', error => {
  // eslint-disable-next-line no-console
  errorlogger.error(error);
  process.exit(1);
});

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    //console.log
    logger.info(`Database connected successfully`);

    app.listen(config.port, () => {
      logger.info(
        `University management server listening on port ${config.port}`
      );
    });
  } catch (err) {
    errorlogger.error(`Failed to connect database`, err);
  }
}

process.on('unhandledRejection', error => {
  // eslint-disable-next-line no-console
  console.log('Unhandle rejection is detected we are closing our server...');

  if (server) {
    server.close(() => {
      errorlogger.error(error);
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

main();

process.on('SIGTERN', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
