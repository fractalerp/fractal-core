import * as fs from "fs";
import * as dotenv from "dotenv";
import * as appRoot from "app-root-path";
import * as winston from "winston";

// make sure that the environment is set
dotenv.config();

const logDir = `${appRoot}/logs`;
const logPath = `${logDir}/${process.env.NODE_ENV}.log`;

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const options = {
  file: {
    level: process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test" ? "debug" : "info",
    filename: logPath,
    handleExceptions: true,
    json: true,
    maxsize: 1024000000, // 1GB
    maxFiles: 1024,
    colorize: true
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: true,
    colorize: true
  }
};

export const fractalLogger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
});

export class FractalLogger {
  // create a stream object with a 'write' function that will be used by `morgan`
  stream = {
    write: (message: any, _encoding: any) => {
      // use the 'info' log level so the output will be picked up by both transports (file and console)
      fractalLogger.info(message);
    }
  };
}
export default new FractalLogger();
