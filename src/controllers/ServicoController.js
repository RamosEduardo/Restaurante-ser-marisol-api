const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const ServicoOferecidoSchema = require(`../models/ServicoOferecido`);

module.exports = {
    async create(req, res) {
        
        const { descricao, titulo } = req.params;
        const { path } = req.file;

        image2base64(path).then(
            async (response) => {
                const imagem = 'data:image/png;base64,' + response;
                const { _id } = await ServicoOferecidoSchema.create({
                    imagem,
                    descricao,
                    titulo
                });
                res.json({ _id });
            }
        ).catch(
            (error) => {
                console.log('erro',error); //Exepection error....
                throw new Error(error)
            }
        ) 
    },

    async index(req, res) {
        const servicos = await ServicoOferecidoSchema.find()
        return res.json(servicos)
    },

    async getById(req, res) {
        const { id } = req.params;
        const servicos = await ServicoOferecidoSchema.findById(id)
        return res.json([servicos])
    },

    async delete(req, res) {
        const { id } = req.params;
        await ServicoOferecidoSchema.findByIdAndDelete(id);
        res.status(204).send();
    },
}