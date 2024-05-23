import { Model, Sequelize } from "sequelize";

interface ProductoAttributes {
  idProducto: number;
  nombre: string;
  cantidad: number;
  descipcion: string;
  precio: number;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Producto
    extends Model<ProductoAttributes>
    implements ProductoAttributes
  {
    public idProducto!: number;
    public nombre!: string;
    public cantidad!: number;
    public descipcion!: string;
    public precio!: number;
    
  }
  Producto.init(
    {
      idProducto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      descipcion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return Producto;
};