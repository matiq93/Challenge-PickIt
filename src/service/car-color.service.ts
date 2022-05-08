import { CarColor } from "../model/db/car-color";
import logger from "../utils/logger";

export class CarColorService {
    

    public async findCarColorById(id:number){
        let carColor;
        try{
            carColor = await CarColor.findByPk(id);
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        return carColor;
    }

    public async findCarColors(): Promise<CarColor[]> {
        let carColors: CarColor[];
        try{
            carColors = await CarColor.findAll({
                attributes:['id','description']});
        }catch(error){            
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        
        return carColors;
    }

    public async getIdColorByDescription(description: string): Promise<number> {
        try{
            const carColor: CarColor | null= await CarColor.findOne({
                where:{description:description}
            })
            if(carColor){
                return carColor.id;
            }else{
                return -1;
            }
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        
    }
    

    
}