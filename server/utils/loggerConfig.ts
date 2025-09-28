import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Define colors for console output
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  debug: 'blue',
};

winston.addColors(colors);

// Create format for development (human-readable)
const devFormat = winston.format.combine(
  winston.format.timestamp({ format: 'HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, module, ...meta }) => {
    const moduleStr = module ? `[${module}]` : '';
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `${timestamp} ${level} ${moduleStr} ${message}${metaStr}`;
  })
);

// Create format for production (structured JSON)
const prodFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

// Create transports based on environment
const createTransports = (): winston.transport[] => {
  const transports: winston.transport[] = [];

  // Always add console transport
  transports.push(
    new winston.transports.Console({
      format: isDevelopment ? devFormat : prodFormat,
      level: isDevelopment ? 'debug' : 'info',
    })
  );

  // Add file transports for production or when explicitly enabled
  if (isProduction || process.env.ENABLE_FILE_LOGGING === 'true') {
    // Error logs
    transports.push(
      new DailyRotateFile({
        filename: 'logs/error-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        level: 'error',
        maxSize: '20m',
        maxFiles: '14d',
        format: prodFormat,
      })
    );

    // Combined logs
    transports.push(
      new DailyRotateFile({
        filename: 'logs/combined-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        maxSize: '20m',
        maxFiles: '14d',
        format: prodFormat,
      })
    );
  }

  return transports;
};

// Base logger configuration
export const loggerConfig: winston.LoggerOptions = {
  level: isDevelopment ? 'debug' : 'info',
  levels,
  transports: createTransports(),
  // Don't exit on handled exceptions
  exitOnError: false,
  // Handle uncaught exceptions
  exceptionHandlers: isProduction ? [
    new DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: prodFormat,
    })
  ] : [],
  // Handle unhandled promise rejections
  rejectionHandlers: isProduction ? [
    new DailyRotateFile({
      filename: 'logs/rejections-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      format: prodFormat,
    })
  ] : [],
};