const mongoose = require("mongoose");

const File = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
            //required define se a propriedade é obrigatória
        },
        path: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
        //coloca a data de criacao e a ultima modificação
        toObject: { virtuals: true},
        toJSON: { virtuals: true}
    }
);

File.virtual("url").get(function() {
    const url = process.env.URL || "http://localhost:3333"

    return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);