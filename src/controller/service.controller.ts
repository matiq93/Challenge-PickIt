import { Request, Response } from "express";
import { Service } from "../model/db/service";
import { ServiceService } from "../service/service.service";
import logger from "../utils/logger";

export class ServiceController{

    private serviceService: ServiceService

    constructor(){
        this.serviceService= new ServiceService;
    }

    public async getServices(req: Request, resp: Response){
        let services: Service[];
        try{
            services = await this.serviceService.findServices();
            logger.info(JSON.stringify(services));
            resp.status(200).json(services);
        }catch(error:any){            
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }
}

