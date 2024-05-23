"use strict";
/*
import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../modelsNoSQL";

class AgenteController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: AgenteController;
    public static get instance():AgenteController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new AgenteController("agente");
        return this._instance;
    }

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //CRUD
        //this.router.get("/consultar",);
        this.router.post("/crear",this.postCrear.bind(this));
        //this.router.post("/cambiar",);
        //this.router.post("/eliminar",);
    }

    private async postCrear(req: Request, res: Response){
        try{
            console.log(req.body);
            await db.Agente.create(req.body);
            console.log("Agente creado")
            res.status(200).send("Agente creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear agente");
        }
    }
    private async getTest(req: Request, res: Response){
        try{
            console.log("AgenteController works");
            res.status(200).send("AgenteController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en AgenteController");
        }
    }
}

export default AgenteController;
*/ 
