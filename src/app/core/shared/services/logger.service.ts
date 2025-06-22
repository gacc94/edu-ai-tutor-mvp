import { Inject, Injectable, Optional, InjectionToken } from '@angular/core';
import { isDevMode } from '@angular/core';

/**
 * Log levels for the logger service
 */
export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Off = 'off'
}

/**
 * Injection token for logger options
 */
export const LOGGER_OPTIONS = new InjectionToken<LoggerOptions>('LOGGER_OPTIONS');

/**
 * Options for the logger service
 */
export interface LoggerOptions {
  /**
   * Minimum log level to output (default: LogLevel.Debug in dev, LogLevel.Info in prod)
   */
  level?: LogLevel;
  
  /**
   * Whether to enable console logging (default: true in dev, false in prod)
   */
  enableConsoleLogging?: boolean;
  
  /**
   * Whether to include timestamps in logs (default: true)
   */
  includeTimestamp?: boolean;
  
  /**
   * Custom log formatter function
   */
  formatter?: (level: LogLevel, message: string, ...args: any[]) => string;
}

/**
 * A simple logging service that can be used throughout the application
 */
@Injectable({
  providedIn: 'root'
})
export class Logger {
  private readonly options: Required<LoggerOptions>;
  private readonly contextMap = new Map<string, string>();

  constructor(
    @Optional() @Inject(LOGGER_OPTIONS) options?: LoggerOptions
  ) {
    const isDev = isDevMode();
    
    this.options = {
      level: options?.level ?? (isDev ? LogLevel.Debug : LogLevel.Info),
      enableConsoleLogging: options?.enableConsoleLogging ?? isDev,
      includeTimestamp: options?.includeTimestamp ?? true,
      formatter: options?.formatter ?? this.defaultFormatter.bind(this),
    };
  }

  /**
   * Set the log level
   */
  setLevel(level: LogLevel): void {
    this.options.level = level;
  }

  /**
   * Enable or disable console logging
   */
  setConsoleLogging(enabled: boolean): void {
    this.options.enableConsoleLogging = enabled;
  }

  /**
   * Set a context value that will be included in all log messages
   */
  setContext(key: string, value: string): void {
    this.contextMap.set(key, value);
  }

  /**
   * Remove a context value
   */
  removeContext(key: string): void {
    this.contextMap.delete(key);
  }

  /**
   * Clear all context values
   */
  clearContext(): void {
    this.contextMap.clear();
  }

  /**
   * Log a debug message
   */
  debug(message: string, ...args: any[]): void {
    this.log(LogLevel.Debug, message, ...args);
  }

  /**
   * Log an info message
   */
  info(message: string, ...args: any[]): void {
    this.log(LogLevel.Info, message, ...args);
  }

  /**
   * Log a warning message
   */
  warn(message: string, ...args: any[]): void {
    this.log(LogLevel.Warn, message, ...args);
  }

  /**
   * Log an error message
   */
  error(message: string, ...args: any[]): void {
    this.log(LogLevel.Error, message, ...args);
  }

  /**
   * Log a message with the specified log level
   */
  log(level: LogLevel, message: string, ...args: any[]): void {
    // Skip if logging is disabled for this level
    if (!this.shouldLog(level)) {
      return;
    }

    // Format the message
    const formattedMessage = this.options.formatter(level, message, ...args);

    // Log to console if enabled
    if (this.options.enableConsoleLogging) {
      this.consoleLog(level, formattedMessage);
    }
  }

  /**
   * Check if a message with the given level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    if (this.options.level === LogLevel.Off) {
      return false;
    }

    const levels = Object.values(LogLevel);
    const currentLevelIndex = levels.indexOf(this.options.level);
    const messageLevelIndex = levels.indexOf(level);

    return messageLevelIndex >= currentLevelIndex && messageLevelIndex !== -1;
  }

  /**
   * Default log formatter
   */
  private defaultFormatter(level: LogLevel, message: string, ...args: any[]): string {
    const timestamp = this.options.includeTimestamp ? `[${new Date().toISOString()}] ` : '';
    const context = this.contextMap.size > 0 
      ? ` ${Array.from(this.contextMap.entries()).map(([k, v]) => `${k}=${v}`).join(' ')}` 
      : '';
    const formattedMessage = `${timestamp}[${level.toUpperCase()}]${context} ${message}`;
    
    // If there are additional args, include them as JSON
    if (args.length > 0) {
      try {
        const extra = args.map(arg => 
          arg instanceof Error 
            ? { message: arg.message, stack: arg.stack, ...(arg as any) } 
            : arg
        );
        return `${formattedMessage}\n${JSON.stringify(extra, null, 2)}`;
      } catch (e) {
        return `${formattedMessage} [Error stringifying arguments]`;
      }
    }
    
    return formattedMessage;
  }

  /**
   * Log to the console with appropriate log level
   */
  private consoleLog(level: LogLevel, message: string): void {
    switch (level) {
      case LogLevel.Debug:
        console.debug(message);
        break;
      case LogLevel.Info:
        console.info(message);
        break;
      case LogLevel.Warn:
        console.warn(message);
        break;
      case LogLevel.Error:
        console.error(message);
        break;
      default:
        console.log(`[${level}] ${message}`);
    }
  }
}

/**
 * A no-op logger that can be used in tests or when logging should be disabled
 */
@Injectable({
  providedIn: 'root'
})
export class NoopLogger extends Logger {
  constructor() {
    super({ level: LogLevel.Off, enableConsoleLogging: false });
  }
}
