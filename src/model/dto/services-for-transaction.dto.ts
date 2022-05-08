import { ServiceForTransaction } from "../db/services-for-transaction";
import { Transaction } from "../db/transaction";

export interface ServiceForTransactionDTO {
  service_id: number;
  unit_price: number;
}

export interface TransactionDetailDTO {
    transaction:Transaction | null;
    detail:ServiceForTransaction[];
}