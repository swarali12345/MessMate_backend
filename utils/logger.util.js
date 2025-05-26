const { createLogger, format, transports } = require("winston");
const path = require("path");

const logFormat = format.printf(({ timestamp, level, message, stack }) => {
  // If error stack is present, log it, else log message
  return stack
    ? `[${timestamp}] ${level}: ${message}\nStack: ${stack}`
    : `[${timestamp}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info", // minimum level to log
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }), // capture stack trace
    format.splat(),
    format.colorize(), // colorize for console
    logFormat
  ),
  transports: [
    new transports.Console({
      handleExceptions: true,
    }),
    new transports.File({
      filename: path.join("logs", "error.log"),
      level: "error",
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new transports.File({
      filename: path.join("logs", "combined.log"),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

module.exports = logger;
