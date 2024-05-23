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
const models_1 = __importDefault(require("../models"));
class ProductoController extends AbstractController_1.default {
    static get instance() {
        if (this._instance) {
            return this._instance;
        }
        this._instance = new ProductoController("producto");
        return this._instance;
    }
    initializeRoutes() {
        //CRUD
        this.router.get("/consultar", this.getConsultar.bind(this));
        this.router.post("/crear", this.postCrear.bind(this));
    }
    getConsultar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let Producto = yield models_1.default["Producto"].findAll();
                res.status(200).send(Producto);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    postCrear(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield models_1.default.Producto.create(req.body);
                res.status(200).send({ message: "Producto creado" });
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.default = ProductoController;
