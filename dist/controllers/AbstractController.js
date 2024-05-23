"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class AbstractController {
    //Metodos getter
    get router() {
        return this._router;
    }
    get prefix() {
        return this._prefix;
    }
    //Metodo constructor
    constructor(prefix) {
        this._router = (0, express_1.Router)();
        this._prefix = prefix;
        this.initializeRoutes();
    }
}
exports.default = AbstractController;
