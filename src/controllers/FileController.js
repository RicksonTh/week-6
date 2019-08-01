const Box = require("../models/Box");
const File = require("../models/File");
//precisa importar o módulo que quero destinar esse controller

class FileController {
    async store(req, res) {
        const box = await Box.findById(req.params.id);
        
        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key,
        });

        box.files.push(file);

        await box.save();

        req.io.sockets.in(box._id).emit("file",file);
        //vai enviar a todos os usuários(ou dispositivos) daquela box, a alteração que foi feita em tempo real.
        //sockets são as conexões

        return res.json(file);
}
}

module.exports = new FileController();
//usar o new para que seja exportado apenas a instância, não a classe. 