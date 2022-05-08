import { BelongsTo, CreationOptional, DataTypes,  ForeignKey,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";
import { CarColor } from "./car-color";
import { Owner } from "./owner";

export class Car extends Model<InferAttributes<Car>,InferCreationAttributes<Car>>{
    declare id :CreationOptional<number> ;
    declare plate: string;
    declare brand: string;
    declare model: string;
    declare year: string;
    declare car_color_id: ForeignKey<CarColor['id']>;
    declare owner_id: ForeignKey<Owner['id']>;
    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date>;
    declare created_at: CreationOptional<Date>;
}

Car.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        plate : {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        brand : {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        model:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        year:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE,
    },
    {
        sequelize: DBConnection,
        tableName: 'cars',
        timestamps: true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid:true
    });

Car.belongsTo(CarColor, {foreignKey:'car_color_id'});   
Car.belongsTo(Owner, {foreignKey:'owner_id'});      
