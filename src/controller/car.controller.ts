import { Request, Response } from "express";
import { Car } from "../model/db/car";
import { CarService } from "../service/car.service";
import logger from "../utils/logger";

export class CarController{

    private carService: CarService

    constructor(){
        this.carService= new CarService;
    }

    async getCars(req: Request, resp: Response){
        try{
            const cars: Car[]= await this.carService.findCars();
            logger.info(JSON.stringify(cars));
            resp.status(200).json(cars);
        }catch(error: any){
            logger.error(error.message);            
            resp.status(400).json({error:error.message});
        }
    };

    async getCarById (req: Request, resp: Response){
        try{
            const car: Car | null = await this.carService.findCarById(Number(req.params.car_id));
            if(car){                
                logger.info(JSON.stringify(car));
                resp.status(200).json(car);
            }else{
                logger.info(`No existe un auto con id ${req.params.car_id}`);
                resp.status(204).json({msg:`No existe un auto con id ${req.params.car_id}`});
            }
        }catch(error: any){    
            logger.error(error.message);        
            resp.status(400).json({error:error.message});
        }
    };
    
    async createCar (req: Request, resp: Response){
        try{
            let car: any = {
                brand: req.body.brand,
                model: req.body.model,
                plate: req.body.plate,
                year: req.body.year,
                owner_id: req.body.owner_id,
                car_color_id: req.body.color_id,
            };
            car = await this.carService.createCar(car);            
            logger.info(JSON.stringify(car));
            resp.status(201).json(car)
        }catch(error: any){    
            logger.error(error.message);        
            resp.status(400).json({error:error.message});
        }
    };
    
    async updateCar (req: Request, resp: Response){
        try{
            let car: any = {
                id: req.params.car_id,
                brand: req.body.brand,
                model: req.body.model,
                year: req.body.year,
                owner_id: req.body.owner_id,
                car_color_id: req.body.color_id,
            };
            const rowsUpdated = await this.carService.updateCar(car)
            if(rowsUpdated[0]>0){
                logger.info(`modificado Auto id: ${req.params.car_id}`);
                resp.status(200).json({msg:'modificado con exito'});
            }else{                
                logger.info(`no se modifico ningun registro`);
                resp.status(200).json({msg:'no se modifico ningun registro'});
            }
        }catch(error: any){  
            logger.error(error.message);          
            resp.status(400).json({error:error.message});
        }
    };
    
    async deleteCar (req: Request, resp: Response) {
        try{
            this.carService.deleteCar(Number(req.params.car_id));
            logger.info(`ELiminado Auto id: ${req.params.car_id}`);
            resp.status(200).json({})
        }catch(error: any){            
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    };
}