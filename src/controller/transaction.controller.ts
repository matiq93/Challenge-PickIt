import { Request, Response } from "express";
import { Transaction } from "../model/db/transaction";
import { TransactionDetailDTO } from "../model/dto/services-for-transaction.dto";
import { TransactionServices } from "../service/transaction.service";
import logger from "../utils/logger";

export class TransactionController{

    private transactionService: TransactionServices;

    constructor(){
        this.transactionService= new TransactionServices;
    }
    
    async getCarTransactions(req: Request, resp: Response){
        try{
            const historical:TransactionDetailDTO []= await this.transactionService.getHistoricalByCarId(Number(req.params.car_id));
            logger.info(JSON.stringify(historical));
            resp.status(200).json(historical);            
        }catch(error:any){
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }

    async createTransaction(req: Request, resp: Response){
        try{
            const transactionId: number = await this.transactionService.createTransaction(req.body.car_id,req.body.transactions);
            const newTransaction:TransactionDetailDTO = await this.transactionService.getTransactionDetailById(transactionId);
            logger.info(JSON.stringify(newTransaction));
            resp.status(201).json(newTransaction);
        }catch(error:any){
            logger.error(error.message);
            resp.status(400).json({error:error.message});
        }
    }
}

