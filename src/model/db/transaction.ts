import { CreationOptional, DataTypes,  ForeignKey,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";

import { Car } from "./car";
import { Service } from "./service";
import { ServiceForTransaction } from "./services-for-transaction";

export class Transaction extends Model<InferAttributes<Transaction>,InferCreationAttributes<Transaction>>{
    declare id :CreationOptional<number> ;
    declare total_amount :CreationOptional<number> ;
    
    
    declare car_id: ForeignKey<Car['id']>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date>;
    declare created_at: CreationOptional<Date>;
}

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
          total_amount: {
            type: new DataTypes.DECIMAL(10,2),
            allowNull: true
          },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    },
    {
        sequelize: DBConnection,
        tableName: 'transactions',
        timestamps: true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid:true
    }
);

Transaction.belongsTo(Car, {foreignKey:'car_id'});       
Transaction.belongsToMany(Service,{through:ServiceForTransaction, foreignKey:'transaction_id'})
