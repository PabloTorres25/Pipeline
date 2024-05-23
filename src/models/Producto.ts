import { Model, Sequelize } from "sequelize";

interface SiniestroAttributes {
  idSiniestro: number;
  fechaInicio: string;
  fechaFin: string;
  idAjustador: string;
  idPersona: string;
  idPoliza: string;
  transcript: string;
  idAgente: string;
  estatus: boolean;
}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Siniestro
    extends Model<SiniestroAttributes>
    implements SiniestroAttributes
  {
    public idSiniestro!: number;
    public fechaInicio!: string;
    public fechaFin!: string;
    public idAjustador!: string;
    public idPersona!: string;
    public idPoliza!: string;
    public transcript!: string;
    public idAgente!: string;
    public estatus!: boolean;
  }
  Siniestro.init(
    {
      idSiniestro: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      fechaInicio: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fechaFin: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      idAjustador: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      idPersona: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      idPoliza: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      transcript: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      idAgente: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
      estatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Siniestro",
    }
  );
  return Siniestro;
};