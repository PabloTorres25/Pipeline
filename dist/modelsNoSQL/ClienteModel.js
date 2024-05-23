"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodbService_1 = __importDefault(require("../services/dynamodbService"));
const joi_1 = __importDefault(require("joi"));
const config_1 = require("../config");
const ClienteModel = dynamodbService_1.default.define("cliente", {
    hashKey: "idCliente",
    timestamps: true,
    schema: {
        idCliente: dynamodbService_1.default.types.uuid(),
        nombre: joi_1.default.string().required(),
        genero: joi_1.default.string().required(),
        correo: joi_1.default.string().email().required(),
        password: joi_1.default.string().required()
    },
    tableName: `Cliente${config_1.PREFIX_NAME}`,
});
dynamodbService_1.default.createTables(function (err) {
    if (err) {
        console.error("Error creating tables: ", err);
    }
    else {
        console.log("Table Cliente has been created");
    }
});
exports.default = ClienteModel;
