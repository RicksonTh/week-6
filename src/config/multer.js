//Definir configurações dos multer
const multer = require("multer");
const path = require("path");
//biblioteca padrão do node para lidar com caminhos
const crypto = require("crypto");
//para gerar números únicos(hashs)

module.exports = {
    dest: path.resolve(__dirname,"..","..","tmp"),
    //resolve() serve para padronizar os caminhos do arquivos
    //dest é para onde vai
    //Path padroniza a pasta onde tá o arquivo multer

    storage: multer.diskStorage({
    //storage é onde vou salvar os arquivos
       destination: (req,file,cb) => {
        //função que vai rececer o local onde vai ficar salvo. É a mesma coisa que o dest, mas precisa repetir.
          cb(null, path.resolve(__dirname,"..","..","tmp"));
          //parametros: erro/destino
       },
       
       filename: (req,file,cb) => {
       //função que vai atribuir um nome único ao arquivo
       crypto.randomBytes(16,(err,hash) => {
       //função para criar hash. Parâmetros: número de caracteres/cb
        if (err) cb(err);
        
        file.key = `${hash.toString("hex")}-${file.originalname}`;
        //vai criar uma propriedade para file chamada key. ex: hfjfgryebu26ge64-teste.jpg.

        cb(null,file.key);
       });
       }
       
    })
};