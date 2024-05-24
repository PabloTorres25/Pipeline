"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AbstractController_1 = __importDefault(require("./AbstractController"));
const ClienteModel_1 = __importDefault(require("../modelsNoSQL/ClienteModel"));
class ClienteController extends AbstractController_1.default {
    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new ClienteController("cliente");
        return this._instance;
    }
    initializeRoutes() {
        //CRUD
        this.router.get("/consultar", this.getConsultarAll.bind(this));
        this.router.post("/crear", this.postCrear.bind(this));
    }
    getConsultarAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Consultar poliza
            try {
                const polizas = yield ClienteModel_1.default.scan().exec().promise();
                res.status(200).json(polizas[0].Items);
            }
            catch (error) {
                res.status(500).send("Error al consultar las polizas: ${error}");
            }
        });
    }
    postCrear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const poliza = req.body;
                console.log(poliza);
                const result = yield ClienteModel_1.default.create(poliza);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(500).send("Error al crear la poliza: ${error}");
            }
        });
    }
}
exports.default = ClienteController;
