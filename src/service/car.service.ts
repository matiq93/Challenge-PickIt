import { Car } from "../model/db/car";
import { CarColor } from "../model/db/car-color";
import { Owner } from "../model/db/owner";
import logger from "../utils/logger";

export class CarService {
    
    
    public async createCar(car: Car): Promise<Car> {
        let newCar: Car
        try{
            newCar = await Car.create(car); 
        }catch(error){
           logger.error(error);
           throw new Error('Ocurrio un error al insertar en la Base de Datos');
        }
        return newCar;
    }

    public async findCars():Promise<Car[]> {
        let cars: Car[];
        try{
            cars= await Car.findAll({
                attributes:['id','plate','brand','model','year'],
                include:[
                    {model:CarColor,
                    attributes:['id','description']},
                    {model:Owner,
                    attributes:['id','document','name','surname']}
                ]
            })
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        return cars        
    }

    
    public async findCarById(car_id: number):Promise<Car | null> {
        let car: Car | null;
        try{
            car = await Car.findByPk(car_id,{
                attributes:['id','plate','brand','model','year'],
                include:[
                    {model:CarColor,
                    attributes:['id','description']},
                    {model:Owner,
                    attributes:['id','document','name','surname']}
                ]
            })                    
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        return car;   
    }


    public async findCarByPlate(plate:string){
        let car;
            try{
                car = await Car.findOne({where:{
                    plate:plate
                }});               
            }catch(error){
                logger.error(error);
                throw new Error('Ocurrio un error al consultar la Base de Datos');
            }
            return car;
    }

    public async updateCar(car: Car) {
        try{
           const rowsUpdated = await Car.update({
                brand: car.brand,
                model: car.model,
                plate: car.plate,
                year: car.year,
                owner_id: car.owner_id,
                car_color_id: car.car_color_id
            },{
                where:{
                    id : car.id
                }
            })
            return rowsUpdated;
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al modificar el registro');
        }
    }

    public async deleteCar(car_id: number) {
        try{
            await Car.destroy({
                where:{id:car_id}
            })
        }catch(error){
            console.log(error);
            throw new Error('Ocurrio un error al eliminar en la Base de Datos');
        }
    }

}