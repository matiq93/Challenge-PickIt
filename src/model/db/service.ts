import { CreationOptional, DataTypes,  ForeignKey,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";
import { Car } from "./car";
import { ServiceForTransaction } from "./services-for-transaction";
import { Transaction } from "./transaction";

export class Service extends Model<InferAttributes<Service>,InferCreationAttributes<Service>>{
    declare id :CreationOptional<number> ;
    declare description : string;
    
    declare color_id: ForeignKey<Car['id']>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date>;
    declare created_at: CreationOptional<Date>;
}

Service.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
          },
        description: {
            type: new DataTypes.STRING(128),
            allowNull: false
          },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    },
    {
        sequelize: DBConnection,
        tableName: 'services',
        timestamps: true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid:true
    }
);

//Service.belongsToMany(Transaction,{through:ServiceForTransaction, foreignKey:'service_id'})