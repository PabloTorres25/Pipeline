import Server from "./providers/Server";
import {PORT,NODE_ENV} from './config';
import express from 'express';
import ProductoController from "./controllers/ProductoController";
import ClienteController from "./controllers/ClienteController";


const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
      ProductoController.instance,
      ClienteController.instance
    ]
    
});

server.init();