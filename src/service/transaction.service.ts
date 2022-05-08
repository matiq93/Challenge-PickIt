import DBConnection from "../config/config-db";
import { ServiceForTransaction } from "../model/db/services-for-transaction";
import { Transaction } from "../model/db/transaction";
import { Service } from "../model/db/service";
import { ServiceForTransactionDTO, TransactionDetailDTO } from "../model/dto/services-for-transaction.dto";
import logger from "../utils/logger";


export class TransactionServices {
  constructor() {}

  public async createTransaction( car_id: number, services: ServiceForTransactionDTO[]): Promise<number> {
    const t = await DBConnection.transaction();
    try {
      const trans: Transaction = await Transaction.create(
        { car_id },
        { transaction: t }
      );
      let totalAmount: number = 0;

      await services.forEach(async (service) => {
        totalAmount += service.unit_price;
        await ServiceForTransaction.create(
          {
            service_id: service.service_id,
            transaction_id: trans.id,
            unit_price: service.unit_price,
          },
          { transaction: t }
        );
      });
      await Transaction.update(
        {
          total_amount: totalAmount,
        },
        {
          where: {
            id: trans.id,
          },
          transaction: t,
        }
      );
      await t.commit();
      return trans.id;
    } catch (error) {
      logger.error(error);
      await t.rollback();
      throw error;
    }
  }

  public async getTransactionDetailById(id: number ): Promise<TransactionDetailDTO> {
    try {
      const transaction: Transaction | null = await Transaction.findByPk(id, {
        attributes: ["id", "total_amount"],
      });
      const detail: ServiceForTransaction[] =
        await ServiceForTransaction.findAll({
          attributes: ["unit_price"],
          include: {
            model: Service,
            attributes: ["id", "description"],
          },
          where: { transaction_id: id },
        });
      const transactionDetail: TransactionDetailDTO = { transaction, detail };
      return transactionDetail;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

    public async getHistoricalByCarId(car_id: number ) :Promise<TransactionDetailDTO[]> {
        try {
            let historical: TransactionDetailDTO[]=[];
            const transactions: Transaction[] = await Transaction.findAll({
                attributes: ["id", "total_amount"],
                where: { car_id: car_id },
                order:[ ['created_at','ASC']]
            });

            for ( const transaction of transactions){
                await historical.push({
                    transaction:transaction,
                    detail: await ServiceForTransaction.findAll({
                        attributes: ["unit_price"],
                        include: {
                          model: Service,
                          attributes: ["id", "description"],
                        },
                        where: { transaction_id: transaction.id }
                      })}
                    )
            }
            return historical;
        } catch (error) {
          logger.error(error);
            throw error;
        }
    }
}