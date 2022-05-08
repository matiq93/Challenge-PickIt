import * as dotenv from "dotenv";
import morgan, { StreamOptions } from "morgan";
import { Dialect, Sequelize } from "sequelize/types";
import logger from "../utils/logger";

export abstract class ConfigServer{
    
    constructor(){
        dotenv.config()
    }   
    
    public getEnvironment(key : string){
         return process.env[key];
    }

    public getNumberEnvironment(key : string):number{
        return Number(this.getEnvironment(key));
    }
 
    
}

const stream: StreamOptions = {
    // Use the http severity
    write: (message) => logger.info(message),
  };

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream }
  );

export default morganMiddleware
