import { Dialect, Sequelize } from 'sequelize'
import * as dotenv from "dotenv";

      dotenv.config()

      const dbName = process.env.DB_NAME as string;
      const dbUser = process.env.DB_USER as string;
      const dbHost = process.env.DB_HOST;
      const dbPort = Number(process.env.DB_PORT);
      const dbPassword = process.env.DB_PASSWORD;


       const DBConnection: Sequelize = new Sequelize(
         dbName,
         dbUser,
         dbPassword,
         {
           host: dbHost,
           dialect: "mysql",
           port: dbPort,
         }
       );

  
   
export default DBConnection

