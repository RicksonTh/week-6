const mongoose = require("mongoose");

const Box = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
            //required define se a propriedade é obrigatória
        },
        files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}]
    },
    {
        timestamps: true
        //coloca a data de criacao e a ultima modificação
    }
);

module.exports = mongoose.model("Box", Box);