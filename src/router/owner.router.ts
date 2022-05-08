import { Request, Response } from "express";
import { body } from "express-validator";
import { OwnerController } from "../controller/owner.controller";
import { OwnerMiddleware } from "../middleware/owner.middleware";
import { BaseRouter } from "./router";

export class OwnerRouter extends BaseRouter<OwnerController,OwnerMiddleware>{

   constructor(){
       super(OwnerController,OwnerMiddleware);
   } 

   routes(): void {
       this.router.get('/owner',
       (req: Request, resp: Response)=> this.controller.getOwners(req,resp));

       
       this.router.post('/owner',
        //validaciones de existencia o formato
       body('name','El Nombre no puede estar vacio').not().isEmpty(),
       body('surname','El Apellido no puede estar vacio').not().isEmpty(),
       body('document','El Documento no tiene un formato valido').matches(/[\d]{7}|[\d]{8}/),
       this.middleware.validateFields,
       //validaciones de existencia contra BD
       body('document').custom((document)=>this.middleware.validateDocument(document)),
       this.middleware.validateFields,
       (req: Request, resp: Response)=> this.controller.createOwner(req,resp));
   }
    
}