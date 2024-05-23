"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamodb_1 = __importDefault(require("dynamodb"));
const config_1 = require("../config");
//Configuracion de AWS para acceder al servicio de DynamoDB
dynamodb_1.default.AWS.config.update({
    region: config_1.AWS_REGION,
    accessKeyId: config_1.AWS_ACCESS_KEY_ID,
    secretAccessKey: config_1.AWS_SECRET_ACCESS_KEY,
    //Unicamente para cuentas temporales (AWS Academy)
    sessionToken: config_1.AWS_SESSION_TOKEN,
});
exports.default = dynamodb_1.default;
