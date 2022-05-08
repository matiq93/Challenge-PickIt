import express from "express";
import cors from "cors";
import { CarRouter } from "./router/car.router";
import morganMiddleware, { ConfigServer } from "./config/config";
import { CarColorRouter } from "./router/car-color.router";
import { OwnerRouter } from "./router/owner.router";
import { ServiceRouter } from "./router/service.router";
import { TransactionRouter } from "./router/transaction.router";
import logger from "./utils/logger";

export class Server extends ConfigServer{
    public app : express.Application = express();
    private port : number = this.getNumberEnvironment('PORT');

    constructor(){
        super();
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended : true}));
        this.app.use(morganMiddleware);
        this.app.use(cors());
        //seteo de rutas
        this.app.use('/sql', this.SQLrouters());

        this.listen();
    }

    SQLrouters(): Array<express.Router>{
        return [
            new CarRouter().router,
            new CarColorRouter().router,
            new OwnerRouter().router,
            new ServiceRouter().router,
            new TransactionRouter().router,
        ];
    }

    public listen (){
        this.app.listen(this.port, ()=>{
            logger.info(`Server Listening on port ${this.port}`);
        })
    }
}

new Server();

function morgan(morgan: any) {
    throw new Error("Function not implemented.");
}
