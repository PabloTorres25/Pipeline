import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import ClienteModel from "../modelsNoSQL/ClienteModel";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

class ClienteController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: ClienteController;
    public static get instance():ClienteController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new ClienteController("cliente");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        //CRUD
        this.router.get("/consultar",this.getConsultarAll.bind(this));
        this.router.post("/crear",this.postCrear.bind(this));
    }

    private async getConsultarAll(req: Request, res: Response) {
        // Consultar poliza
        try {
          const polizas = await ClienteModel.scan().exec().promise();
          res.status(200).json(polizas[0].Items);
        } catch (error) {
          res.status(500).send("Error al consultar las polizas: ${error}");
        }
      }
    
      private async postCrear(req: Request, res: Response) {
        try {
          const poliza = req.body;
          console.log(poliza);
    
          const result = await ClienteModel.create(poliza);
          res.status(200).send(result);
        } catch (error) {
          res.status(500).send("Error al crear la poliza: ${error}");
        }
      }
}

export default ClienteController;