import { Request } from "express";
import { Car } from "../model/db/car";
import { Service } from "../model/db/service";
import { ServiceForTransaction } from "../model/db/services-for-transaction";
import { CarColorService } from "../service/car-color.service";
import { CarService } from "../service/car.service";
import { ServiceService } from "../service/service.service";
import { BaseMiddleware } from "./base.middleware";

export class TransactionMiddleware extends BaseMiddleware{
    
    private carService: CarService; 
    private carColorService: CarColorService;
    private serviceService: ServiceService;

    constructor(){
        super();
        this.carService= new CarService;
        this.carColorService= new CarColorService;
        this.serviceService= new ServiceService;
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



    public async validateCreateRequest(body: any) {
        try{           
            const car : any = await this.carService.findCarById(body.car_id); 
            const grayColorId: number = await this.carColorService.getIdColorByDescription('Gris');
            const isAllowToPaint=!(car.CarColor.id===grayColorId);
            const serviceList: Service[] = await this.serviceService.findServices();
            const paintServiceID:number|undefined=serviceList.find(service=>(service.description==="Pintura"))?.id
            const transactions : ServiceForTransaction[]=body.transactions;
            transactions.forEach(transaction=>{
                if(serviceList.find(service=>transaction.service_id===service.id)){
                    if(!isAllowToPaint && transaction.service_id===paintServiceID){
                        throw new Error (`No es posible pintar un auto de ese color`);
                    }                    
                }else {
                    throw new Error (`No existe ese service id`);
                }
            })
       }catch(error){
           throw error
       }
       } 

    }
  