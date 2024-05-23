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
const modelsNoSQL_1 = __importDefault(require("../modelsNoSQL"));
class AgenteController extends AbstractController_1.default {
    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new AgenteController("agente");
        return this._instance;
    }
    initializeRoutes() {
        this.router.get("/test", this.getTest.bind(this));
        //CRUD
        //this.router.get("/consultar",);
        this.router.post("/crear", this.postCrear.bind(this));
        //this.router.post("/cambiar",);
        //this.router.post("/eliminar",);       
    }
    postCrear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                yield modelsNoSQL_1.default.Agente.create(req.body);
                console.log("Agente creado");
                res.status(200).send("Agente creado");
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error al crear agente");
            }
        });
    }
    getTest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("AgenteController works");
                res.status(200).send("AgenteController works");
            }
            catch (err) {
                console.error(err);
                res.status(500).send("Error en AgenteController");
            }
        });
    }
}
exports.default = AgenteController;
