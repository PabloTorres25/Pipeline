import { Request, Response } from 'express';
import AbstractController from './AbstractController';
import db from "../models";
import axios from "axios";
import { error } from "console";

class ProductoController extends AbstractController {
  private static _instance: ProductoController;
  public static get instance(): ProductoController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new ProductoController("producto");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    //CRUD
    this.router.get("/consultar", this.getConsultar.bind(this));
    this.router.post("/crear", this.postCrear.bind(this));
  }
  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("Producto Works");
    } catch (error) {
      res.status(500).send(`Error al conectar con el Siniestro ${error}`);
    }
  }

  private async getConsultar(req: Request, res: Response) {
    try {
      let Producto = await db["Producto"].findAll();
      res.status(200).send(Producto);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  

  private async postCrear(req: Request, res: Response) {
    try {
      await db.Producto.create(req.body);
      res.status(200).send({ message: "Producto creado" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

export default ProductoController;