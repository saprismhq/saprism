import winston from 'winston';
import { loggerConfig } from './loggerConfig';

/**
 * LoggerFactory - Centralized logging system for Saprism
 * 
 * Provides structured logging with Winston, replacing console.log/error throughout the application.
 * Creates module-specific loggers with consistent formatting and contextual information.
 */
export class LoggerFactory {
  private static instance: LoggerFactory;
  private rootLogger: winston.Logger;
  private loggers: Map<string, winston.Logger> = new Map();

  private constructor() {
    this.rootLogger = winston.createLogger(loggerConfig);
    
    // Log startup information
    this.rootLogger.info('LoggerFactory initialized', {
      environment: process.env.NODE_ENV || 'development',
      level: this.rootLogger.level,
      appName: 'saprism'
    });
  }

  /**
   * Get the singleton instance of LoggerFactory
   */
  public static getInstance(): LoggerFactory {
    if (!LoggerFactory.instance) {
      LoggerFactory.instance = new LoggerFactory();
    }
    return LoggerFactory.instance;
  }

  /**
   * Get a logger for a specific module
   * @param module - The module name (e.g., 'AI', 'CRM', 'Transcription')
   * @returns Winston logger instance with module context
   */
  public getLogger(module: string): winston.Logger {
    if (!this.loggers.has(module)) {
      const logger = this.rootLogger.child({ 
        module,
        appName: 'saprism'
      });
      this.loggers.set(module, logger);
    }
    return this.loggers.get(module)!;
  }

  /**
   * Get the root logger (use sparingly, prefer module-specific loggers)
   */
  public getRootLogger(): winston.Logger {
    return this.rootLogger;
  }

  /**
   * Create a contextual logger with additional metadata
   * @param module - The module name
   * @param context - Additional context (e.g., sessionId, userId)
   * @returns Winston logger with added context
   */
  public getContextualLogger(module: string, context: Record<string, any>): winston.Logger {
    const baseLogger = this.getLogger(module);
    return baseLogger.child(context);
  }

  /**
   * Shutdown the logger (cleanup on app exit)
   */
  public async shutdown(): Promise<void> {
    return new Promise((resolve) => {
      this.rootLogger.end(() => {
        resolve();
      });
    });
  }
}

// Export convenience function for getting loggers
export const getLogger = (module: string): winston.Logger => {
  return LoggerFactory.getInstance().getLogger(module);
};

// Export contextual logger function  
export const getContextualLogger = (module: string, context: Record<string, any>): winston.Logger => {
  return LoggerFactory.getInstance().getContextualLogger(module, context);
};

// Export logger factory instance
export const loggerFactory = LoggerFactory.getInstance();