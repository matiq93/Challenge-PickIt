import { Service } from "../model/db/service";
import logger from "../utils/logger";

export class ServiceService{
   
    public async  findServices(): Promise<Service[]> {
        let services: Service[];
        try{
            services = await Service.findAll({
                attributes:['id','description']});
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        return services;
    }

}