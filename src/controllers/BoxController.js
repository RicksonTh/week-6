const Box = require("../models/Box");
//precisa importar o módulo que quero destinar esse controller

class BoxController {
    async store(req, res) {
        const box = await Box.create({ title: req.body.title });
        //body guarda todo o corpo da requisição.

        return res.json(box);
    }

    async show (req,res) {
        const box = await Box.findById(req.params.id).populate({
            path: 'files',
            options: { sort: { createdAt: -1}}
        });
        return res.json(box);
    }
}

module.exports = new BoxController();
//usar o new para que seja exportado apenas a instância, não a classe. 