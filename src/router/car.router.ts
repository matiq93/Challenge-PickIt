import { CarController } from "../controller/car.controller";
import { body, param } from 'express-validator';
import { BaseRouter } from "./router";
import { Request, Response } from "express";
import { CarMiddleware } from "../middleware/car.middleware";
import { platform } from "os";

export class CarRouter extends BaseRouter<CarController,CarMiddleware>{

    constructor(){
        super(CarController,CarMiddleware);
    }

    routes(): void {
        this.router.get('/car',
            (req: Request, resp:Response)=>this.controller.getCars(req,resp));
        
        this.router.get('/car/:car_id',
            param('car_id','el id de auto debe ser numerico').isNumeric(),
            this.middleware.validateFields,
            (req: Request, resp:Response)=>{this.controller.getCarById(req,resp)}
        );

        this.router.post('/car',
        //validaciones de existencia o formato
        body('plate','El Numero de Placa es obligatorio').not().isEmpty(),
        body('plate','El Numero de Placa no tiene un formato valido').matches(/[a-z]{2}[\d]{3}[a-z]{2}|[a-z]{3}[\d]{3}/),
        body('brand','La Marca es obligatorio').not().isEmpty(),
        body('model','El Modelo es obligatorio').not().isEmpty(),
        body('year','El Año es obligatorio').not().isEmpty(),        
        body('color_id','El Color es obligatorio y numerico').isNumeric(),
        body('owner_id','El Dueño es obligatorio y numerico').isNumeric(),
        this.middleware.validateFields,
        //validaciones de existencia contra BD
        body('plate').custom((plate)=>this.middleware.validatePlate(plate)),
        body('color_id').custom((color_id)=>this.middleware.validateCarColorExist(color_id)),
        body('owner_id').custom((owner_id)=>this.middleware.validateOwnerExist(owner_id)),
        this.middleware.validateFields,
        (req: Request, resp:Response)=>{this.controller.createCar(req,resp)}
        );

        this.router.put('/car/:car_id',
        //validaciones de existencia o formato
        param('car_id','el id de auto debe ser numerico').isNumeric(),
        body('brand','La Marca es obligatorio').not().isEmpty(),
        body('model','El Modelo es obligatorio').not().isEmpty(),
        body('year','El Año es obligatorio').not().isEmpty(),
        body('color_id','El Color es obligatorio y numerico').isNumeric(),
        body('owner_id','El Dueño es obligatorio y numerico').isNumeric(),
        this.middleware.validateFields,
        //validaciones de existencia contra BD
        param('car_id').custom((car_id)=>this.middleware.validateCarExist(car_id)),
        body('color_id').custom((color_id)=>this.middleware.validateCarColorExist(color_id)),
        body('owner_id').custom((owner_id)=>this.middleware.validateOwnerExist(owner_id)),
        this.middleware.validateFields,
        (req: Request, resp:Response)=>{this.controller.updateCar(req,resp)});

        this.router.delete('/car/:car_id',
        //validaciones de existencia o formato
        param('car_id','el id de auto debe ser numerico').isNumeric(),
        this.middleware.validateFields,
        //validaciones de existencia contra BD
        param('car_id').custom((car_id)=>this.middleware.validateCarExist(car_id)),
        this.middleware.validateFields,
        (req: Request, resp:Response)=>{this.controller.deleteCar(req,resp)});
    }

}


