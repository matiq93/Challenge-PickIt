import { createLogger  ,format,Logger,transports} from "winston";

const logger :Logger = createLogger({
    transports: [
        new transports.File({
          dirname: "logs",
          filename: "challenge.log",
        }),
        new transports.Console()
      ],
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message}) => {
          return `[${timestamp}] [${level}]: ${message}`;
        })
      ),
      
  });

  export default logger;