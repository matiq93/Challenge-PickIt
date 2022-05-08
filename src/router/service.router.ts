import { Request, Response } from "express";
import { ServiceController } from "../controller/service.controller";
import { ServiceMiddleware } from "../middleware/service.middleware";
import { BaseRouter } from "./router";

export class ServiceRouter extends BaseRouter<ServiceController,ServiceMiddleware>{

    constructor(){
        super(ServiceController,ServiceMiddleware);
    }

    routes(): void {
        this.router.get('/service',
        (req: Request, resp: Response)=>this.controller.getServices(req,resp));
    }
    
}