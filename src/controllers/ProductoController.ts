import { Request, Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import axios from "axios";
import PolizaModel from "../modelsNoSQL/polizaModel";
import SiniestroServiciosAttributes from "../models/SiniestroServicios";
import { error } from "console";

class SiniestroController extends AbstractController {
  private static _instance: SiniestroController;
  public static get instance(): SiniestroController {
    if (this._instance) {
      return this._instance;
    }
    this._instance = new SiniestroController("siniestro");
    return this._instance;
  }

  protected initializeRoutes(): void {
    this.router.get("/test", this.getTest.bind(this));
    //CRUD
    this.router.get("/consultar", this.getConsultar.bind(this));
    this.router.post("/crear", this.postCrear.bind(this));
    this.router.post("/cambiar", this.postCambiar.bind(this));
    this.router.post("/eliminar", this.postEliminar.bind(this));
    this.router.get("/consultarSiniestrosActivosAgente/:idAgente", this.getConsultarSinActAg.bind(this));
    this.router.put("/actualizarFechaFin", this.putFechaFin.bind(this));
    this.router.put("/actualizarIdAjustador", this.putIdAjustador.bind(this));
    this.router.put("/actualizarIdPoliza", this.putIdPoliza.bind(this));
    this.router.put("/actualizarTranscript", this.putTranscript.bind(this));
  }

  private async getTest(req: Request, res: Response) {
    try {
      res.status(200).send("Siniestro Works");
    } catch (error) {
      res.status(500).send(Error al conectar con el Siniestro ${error});
    }
  }

  // Siempre regresa los siniestros ordenados
  private async getConsultar(req: Request, res: Response) {
    try {
      // Obtener los IDs de todos los siniestros con estatus true
      let idSiniestros = [];  
      let siniestros = await db["Siniestro"].findAll({
        where: {
          estatus: true,
        },
      });
      for (let siniestro of siniestros) {
        idSiniestros.push(siniestro.idSiniestro);
      }
      
      // Se buscan todos los SiniestroServicios que tengan un idSiniestro que esté en la lista de idSiniestros y con estatus true
      let siniestrosConServicio = await db["SiniestroServicios"].findAll({
        where: {
          idSiniestro: idSiniestros,
          estatus: true,
        },
      });
  
      // Definimos el tipo del mapa
      type SumaValorPorSiniestro = {
        [key: number]: number;
      }

      // Se suman los valores de los servicios en SiniestroServicios por siniestro
      let sumaValorPorSiniestro: SumaValorPorSiniestro = {};
      for (let siniestroConServicio of siniestrosConServicio) {
        const { idSiniestro, valor } = siniestroConServicio;
        sumaValorPorSiniestro[idSiniestro] = (sumaValorPorSiniestro[idSiniestro] || 0) + (valor || 0);
      }
      let siniestrosOrdenados = siniestros.sort((a: typeof siniestros[0], b: typeof siniestros[0]) => {
        // b - a, para que regrese en orden descendente
        return (sumaValorPorSiniestro[b.idSiniestro] || 0) - (sumaValorPorSiniestro[a.idSiniestro] || 0);
      });
      
      // console.log(sumaValorPorSiniestro);
      // console.log(siniestrosOrdenados);

      res.status(200).json(siniestrosOrdenados);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener siniestros" });
    }
  }
  

  private async getConsultarSinActAg(req: Request, res: Response) {
    try {
      const { idAgente } = req.params;
      if (!idAgente) {
        return res.status(400).json({ message: "IdAgente no proporcionado" });
      }

      let siniestros = await db["Siniestro"].findAll({
        where: {
          idAgente,
          estatus: true,
        },
      });
      res.status(200).json(siniestros);
    } catch (error) {
      res.status(500).json({ message: "Error en Siniestro:", error });
    }
  }

  private async postCrear(req: Request, res: Response) {
    try {
      const { telefono, ubicacion, correoAgente } = req.body;
      const fechaInicio: String = new Date().toLocaleString("es-MX");
      const headers = {
        "ngrok-skip-browser-warning": "true",
      };
      try {
        const persona = await axios.get(
          ${process.env.RUTA_DEV}/poliza/consultarPolizaTelefono/${telefono}, {
            headers,
          }
        );
        const idAgente = await axios.get(
          ${process.env.RUTA_DEV}/agente/agentePorCorreo/${correoAgente}, {
            headers,
          }
        );
        var dataCreate: object = {
          fechaInicio: fechaInicio,
          fechaFin: null,
          idAjustador: null,
          idPersona: persona.data.data[0].idContratante,
          idPoliza: null,
          transcript: null,
          idAgente: idAgente.data,
          estatus: true,
        };
      } catch {
        var dataCreate: object = {
          fechaInicio: fechaInicio,
          fechaFin: null,
          idAjustador: null,
          idPersona: telefono,
          idPoliza: null,
          transcript: null,
          idAgente: null,
          estatus: true,
        };
      }

      const siniestroCreado = await db.Siniestro.create(dataCreate);

      res
        .status(200)
        .json({ message: "Siniestro creado", data: siniestroCreado });
    } catch (error) {
      res.status(400).json({ message: "Siniestro error", error: error });
    }
  }

  private async putFechaFin(req: Request, res: Response) {
    const {  telefono, correoAgente } = req.body;
    const fechaFin: String = new Date().toLocaleString("es-MX");

    const headers = {
      'ngrok-skip-browser-warning': 'true'
    };
    try {
      const persona = await axios.get(
        ${process.env.RUTA_DEV}/poliza/consultarPolizaTelefono/${telefono}, {
          headers,
        }
      );
      const idAgente = await axios.get(
        ${process.env.RUTA_DEV}/agente/agentePorCorreo/${correoAgente}, {
          headers,
        }
      );
      console.log(persona.data.data[0].idContratante)
      console.log(idAgente)
      await db.Siniestro.update({ fechaFin: fechaFin }, {
        where: {
          idPersona: persona.data.data[0].idContratante,
          idAgente: idAgente.data,
          estatus: true
        }
      });

      res.status(201).send("Update Siniestro Fecha Fin")
    } catch (error) {
      res
        .status(500)
        .json({ msg: Error al consultar los Agentes: ${error}, data: {} });
    }
  }

  private async putIdAjustador(req: Request, res: Response) {
    const { correoAgente, telefono, idAjustador} = req.body;

    const headers = {
      'ngrok-skip-browser-warning': 'true'
    };
    try {
      const persona = await axios.get(
        ${process.env.RUTA_DEV}/poliza/consultarPolizaTelefono/${telefono}, {
          headers,
        }
      );
      const idAgente = await axios.get(
        ${process.env.RUTA_DEV}/agente/agentePorCorreo/${correoAgente}, {
          headers,
        }
      );
      const idPersona = persona.data.data[0].idContratante;
      await db.Siniestro.update({ idAjustador: idAjustador }, {
        where: {
          idPersona: idPersona,
          idAgente: idAgente.data,
          estatus: true
        }
      });
      res.status(201).send("Update Siniestro ID Ajustador")
    } catch (error) {
      res.status(404).send(error);
    }
  }

  private async putIdPoliza(req: Request, res: Response) {
    const { correoAgente, telefono, idPoliza} = req.body;

    const headers = {
      'ngrok-skip-browser-warning': 'true'
    };
    try {
      const persona = await axios.get(
        ${process.env.RUTA_DEV}/poliza/consultarPolizaTelefono/${telefono}, {
          headers,
        }
      );
      const idAgente = await axios.get(
        ${process.env.RUTA_DEV}/agente/agentePorCorreo/${correoAgente}, {
          headers,
        }
      );
      const idPersona = persona.data.data[0].idContratante;
      await db.Siniestro.update({ idPoliza: idPoliza }, {
        where: {
          idPersona: idPersona,
          idAgente: idAgente.data,
          estatus: true
        }
      });
      res.status(201).send("Update Siniestro ID Póliza")
    } catch (error) {
      res.status(404).send(error);
    }
  }

  private async putTranscript(req: Request, res: Response) {
    const { correoAgente, telefono, transcript} = req.body;

    const headers = {
      'ngrok-skip-browser-warning': 'true'
    };
    try {
      const persona = await axios.get(
        ${process.env.RUTA_DEV}/poliza/consultarPolizaTelefono/${telefono}, {
          headers,
        }
      );
      const idAgente = await axios.get(
        ${process.env.RUTA_DEV}/agente/agentePorCorreo/${correoAgente}, {
          headers,
        }
      );
      const idPersona = persona.data.data[0].idContratante;
      await db.Siniestro.update({ transcript: transcript }, {
        where: {
          idPersona: idPersona,
          idAgente: idAgente.data,
          estatus: true
        }
      });
      res.status(201).send("Update Siniestro Transcript")
    } catch (error) {
      res.status(404).send(error);
    }
  }

  private async postCambiar(req: Request, res: Response) {}

  private async postEliminar(req: Request, res: Response) {}
}

export default SiniestroController;