const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
//Para que a app ouça requisições em http e ws(web socket)

app.use(cors());
//define quem vai poder consumir a api. Sem isso o front não poderia manipular
io.on("connection", socket => {
    //Quando o front conectar, vou receber um socket. Socket é a representação da conexão do user a api
    socket.on("connectRoom", box => {
        //Quando eu receber um req chamada connectRoom, vou pegar o socket e dar um join para isolar um user a uma sala, longe dos demais
        socket.join(box);
    })
});

app.use((req, res, next) => {
    req.io = io;
    //definindo um variável global dentro do req
    return next();
    //next serve para dar continuidade as rotas, senão ele ia parar aqui nesse midleware
})

mongoose.connect("mongodb+srv://omnistack:omnistack@cluster0-wqyx0.mongodb.net/omnistack?retryWrites=true",
//alterar o nome e a senha do usuário e o nome do banco de dados.
{
useNewUrlParser:true
}
);

app.use(express.json());
//para ler requisições em json. Json é o que é trocado entre frontend e backend
app.use(express.urlencoded({ extended: true}));
//para enviar arquivos via requisição
app.use("/files", express.static(path.resolve(__dirname,"..","tmp")));

app.use(require("./routes"));

server.listen(process.env.PORT || 3333);
//Server: Para que a app ouça requisições em http e ws(web socket)
//process.env.PORT || 3333: para definir uma variável ambiente. Ou seja, para o Heroku definir a porta que vai ser usada.
//Se ele não definir, vai ser a padrão