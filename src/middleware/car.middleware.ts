import { Middleware } from "express-validator/src/base";
import { Car } from "../model/db/car";
import { CarColorService } from "../service/car-color.service";
import { CarService } from "../service/car.service";
import { OwnerService } from "../service/owner.service";
import { BaseMiddleware } from "./base.middleware";

export class CarMiddleware extends BaseMiddleware{
    
    
    
    private carService: CarService;
    private ownerSercice: OwnerService;
    private carColorService: CarColorService;

    constructor(){
        super();
        this.carService= new CarService;
        this.carColorService= new CarColorService;
        this.ownerSercice = new OwnerService;

    }

    public async validatePlate(plate:string){
        try{
            const car = await this.carService.findCarByPlate(plate);
            if(car){
                throw new Error (`Ya existe un auto con la patente ${plate}`)
            }
        }catch(error){
            throw error;
        }
    }

    public async validatePlateExist(plate: string) {
        try{
            const car = await this.carService.findCarByPlate(plate);
            if(!car){
                throw new Error (`No existe un auto con la patente ${plate}`)
            }
        }catch(error){
            throw error;
        }
    }

    public async validateCarColorExist(id : number){
        try{
            const carColor = await this.carColorService.findCarColorById(id);
            if(!carColor){
                throw new Error (`No es un color_id valido`)
            }
        }catch(error){
            throw error;
        }
    }

    public async validateOwnerExist(id : number){
        try{
            const owner = await this.ownerSercice.findOwnerById(id);
            if(!owner){
                throw new Error (`No existe ese dueño`)
            }
        }catch(error){
            throw error;
        }
    }

    public async validateCarExist(car_id: number) {
        try{
            const car= await this.carService.findCarById(car_id);            
            if(!car){
                throw new Error (`No existe ese auto`)
            }
        }catch(error){
            throw error;
        }
    }

}