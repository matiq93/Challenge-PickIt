import { Request, Response } from "express";
import { Owner } from "../model/db/owner";
import { OwnerService } from "../service/owner.service";
import logger from "../utils/logger";

export class OwnerController{

    private ownerService: OwnerService

    constructor(){
        this.ownerService= new OwnerService;
    }

    async getOwners(req:Request, resp: Response){
        let owners: Owner[];
        try{
            owners = await this.ownerService.findOwners();
            logger.info(JSON.stringify(owners));
            resp.status(200).json(owners);
        }catch(error: any){            
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }    

    async createOwner(req:Request, resp: Response){
        try{
            let owner: any ={
                name:req.body.name,
                surname:req.body.surname,
                document:req.body.document,
            }
            owner =await this.ownerService.createOwner(owner);
            logger.info(JSON.stringify(owner));
            resp.status(201).json(owner);
        }catch(error: any){
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }
}