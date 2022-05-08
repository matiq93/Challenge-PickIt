import { OwnerService } from "../service/owner.service";
import { BaseMiddleware } from "./base.middleware";

export class OwnerMiddleware extends BaseMiddleware{

    
    private ownerService: OwnerService;

    constructor(){
        super();
        this.ownerService = new OwnerService;
    }

    public async validateDocument(document: string ){
        try{
            const car = await this.ownerService.findOwnerByDocument(document);
            if(car){
                throw new Error (`Ya existe un Dueño con este documento ${document}`)
            }
        }catch(error){
            throw error;
        }
        
    }

}