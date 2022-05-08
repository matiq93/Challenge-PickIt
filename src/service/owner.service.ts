import { Owner } from "../model/db/owner";
import logger from "../utils/logger";

export class OwnerService {
    
    public async findOwnerById(id:number){
        let owner;
            try{
                owner = await Owner.findByPk(id);
            }catch(error){
                logger.error(error);
                throw new Error('Ocurrio un error al consultar la Base de Datos');
            }
            return owner;
    }

    public async findOwners(): Promise<Owner[]> {
        let owners: Owner[];
        try{
            owners = await Owner.findAll({
                attributes: ['id','name','surname','document']
            });
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al consultar la Base de Datos');
        }
        return owners;
    }

    public async findOwnerByDocument(document: string){
        let owner;
            try{
                owner = await Owner.findOne({
                        where:{
                            document:document
                        }
                });
            }catch(error){
                logger.error(error);
                throw new Error('Ocurrio un error al consultar la Base de Datos');
            }
            return owner;
    }

    public async createOwner(owner:Owner): Promise<Owner>{
        let newOwner: Owner; 
        try{
            newOwner= await Owner.create(owner)
        }catch(error){
            logger.error(error);
            throw new Error('Ocurrio un error al insertar en la Base de Datos');
        }
        return newOwner;
    }
}