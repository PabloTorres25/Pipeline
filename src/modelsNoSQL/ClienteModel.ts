import dynamodb from "../services/dynamodbService";
import joi from "joi";
import { PREFIX_NAME } from "../config";

const ClienteModel = dynamodb.define("cliente", {
  hashKey: "idCliente",
  timestamps: true,
  schema: {
    idCliente: dynamodb.types.uuid(),
    nombre: joi.string().required(),
    genero: joi.string().required(),
    correo: joi.string().email().required(),
    password: joi.string().required()
  },
  tableName: `Cliente${PREFIX_NAME}`,
});

dynamodb.createTables(function (err) {
  if (err) {
    console.error("Error creating tables: ", err);
  } else {
    console.log("Table Cliente has been created");
  }
});

export default ClienteModel;