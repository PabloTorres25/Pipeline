import dynamodb from "../services/dynamodbService";
import joi from "joi";
import { PREFIX_NAME } from "../config";

const AgenteModel = dynamodb.define("agente", {
  hashKey: "idAgente",
  timestamps: true,
  schema: {
    idAgente: dynamodb.types.uuid(),
    nombre: joi.string().required(),
    apellidoP: joi.string().required(),
    apellidoM: joi.string().required(),
    fechaNacimiento: joi.date().required(),
    genero: joi.string().required(),
    correo: joi.string().email().required(),
    password: joi.string().required()
  },
  tableName: Agente${PREFIX_NAME},
});

dynamodb.createTables(function (err) {
  if (err) {
    console.error("Error creating tables: ", err);
  } else {
    console.log("Table Agente has been created");
  }
});

export default AgenteModel;