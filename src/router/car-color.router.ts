import { Request, Response } from "express";

import { CarColorController } from "../controller/car-colors.controller";
import { CarColorMiddleware } from "../middleware/car-color.middleware";
import { BaseRouter } from "./router";

export class CarColorRouter extends BaseRouter<CarColorController,CarColorMiddleware>{

    constructor() {
        super(CarColorController, CarColorMiddleware);
      }

    routes(): void {
        this.router.get('/car-color',        
        (req: Request, resp:Response)=>this.controller.getCarColors(req,resp))     
    }
}