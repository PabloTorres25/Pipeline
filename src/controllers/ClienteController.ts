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
        // Consultar cliente
        try {
          const clientes = await ClienteModel.scan().exec().promise();
          res.status(200).json(clientes[0].Items);
        } catch (error) {
          res.status(500).send("Error al consultar las clientes: ${error}");
        }
      }
    
      private async postCrear(req: Request, res: Response) {
        try {
          const cliente = req.body;
          console.log(cliente);
    
          const result = await ClienteModel.create(cliente);
          res.status(200).send(result);
        } catch (error) {
          res.status(500).send("Error al crear la cliente: ${error}");
        }
      }
}

export default ClienteController;