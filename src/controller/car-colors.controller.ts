import { Request, Response } from "express";
import { CarColor } from "../model/db/car-color";
import { CarColorService } from "../service/car-color.service";
import logger from "../utils/logger";

export class CarColorController{

    private carColorService: CarColorService

    constructor(){
        this.carColorService= new CarColorService;
    }

    async getCarColors(req: Request, resp: Response){
        let carColors: CarColor[];
        try{
            carColors = await this.carColorService.findCarColors();
            logger.info(JSON.stringify(carColors));
            resp.status(200).json(carColors);
        }catch(error: any){
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }

}