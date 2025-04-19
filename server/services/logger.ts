import { format } from 'morgan';
import winston from 'winston';

class Logger {
  private static instance: Logger | null = null;
  private logger: winston.Logger;

  private constructor() {
    if (Logger.instance) {
      throw new Error('Cannot create new instance. Use Logger.getInstance()');
    }
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'app.log' })
      ]
    });
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public info(
    message: string,
    noTimestamp: boolean = false
): void {
    // if(noTimestamp) {
    //     this.logger.info(message, {
    //         format: winston.format.printf(({ level, message }) => {
    //             return `${level}: ${message}`;
    //         })
    //     });
    //     return;
    // }

    this.logger.info(message, {noTimestamp});
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }
}

export default Logger.getInstance();