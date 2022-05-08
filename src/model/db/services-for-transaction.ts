import { CreationOptional, DataTypes,  ForeignKey,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";
import { Service } from "./service";
import { Transaction } from "./transaction";

export class ServiceForTransaction extends Model<InferAttributes<ServiceForTransaction>,InferCreationAttributes<ServiceForTransaction>>{
    declare id :CreationOptional<number> ;
    declare unit_price : number;    
    
    declare service_id: ForeignKey<Service['id']>;
    declare transaction_id: ForeignKey<Transaction['id']>;
}

ServiceForTransaction.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          unit_price: {
            type: new DataTypes.DECIMAL(10,2),
            allowNull: false
          },
          
    },
    {
        sequelize: DBConnection,
        timestamps:false,
        tableName: 'services_for_transactions',
        
    }

    
);

ServiceForTransaction.belongsTo(Service, {foreignKey:'service_id'});
//ServiceForTransaction.belongsTo(Transaction, {foreignKey:'transaction_id'});