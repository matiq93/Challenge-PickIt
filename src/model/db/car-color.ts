import { CreationOptional, DataTypes,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";

export class CarColor extends Model<InferAttributes<CarColor>,InferCreationAttributes<CarColor>>{
    declare id :CreationOptional<number> ;
    declare description : string;

    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date>;
    declare created_at: CreationOptional<Date>;
}

CarColor.init(
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
        tableName: 'car_colors',
        timestamps: true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid:true
    }
);
//CarColor.hasMany(Car,{as:'cars',foreignKey:'car_colors_id'});