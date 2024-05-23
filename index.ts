import Server from "./src/providers/Server";
import {PORT,NODE_ENV} from './src/config';
import express from 'express';
import ProductoController from "./src/controllers/ProductoController";

const server = new Server({
    port:PORT,
    env:NODE_ENV,
    middlewares:[
        express.json(),
        express.urlencoded({extended:true})
    ],
    controllers:[
      ProductoController.instance
    ]
    
});

server.init();