const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");
//arquivo de configuração do multer

const routes = express.Router();
//módulo para utilizar rotas

const BoxController = require("./controllers/BoxController");
//importando o módulo do BoxController
const FileController = require("./controllers/FileController");

//rotas que vão ser utilizadas para envio das requisições
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

routes.post(
    "/boxes/:id/files",
     multer(multerConfig).single("file"), 
     FileController.store
     );
//Habilitando a rota a receber arquivos
//Single determina que vai receber um arquivo por vez, mas poderia receber vários

module.exports = routes;
//vai exportar as informações que estão dentro da variável routes