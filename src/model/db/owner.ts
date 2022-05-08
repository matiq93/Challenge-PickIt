import { BelongsTo, CreationOptional, DataTypes,  ForeignKey,  InferAttributes,  InferCreationAttributes,  Model, Sequelize } from "sequelize";
import DBConnection from "../../config/config-db";

export class Owner extends Model<InferAttributes<Owner>,InferCreationAttributes<Owner>>{
    declare id :CreationOptional<number> ;
    declare document : string;
    declare name: string;
    declare surname: string;

    declare updated_at: CreationOptional<Date>;
    declare deleted_at: CreationOptional<Date>;
    declare created_at: CreationOptional<Date>;
}

Owner.init(
    {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
        },
        document : {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        name : {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        surname:{
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE, 
    },
    {
        sequelize: DBConnection,
        tableName: 'owners',
        timestamps: true,
        createdAt:'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid:true}
)