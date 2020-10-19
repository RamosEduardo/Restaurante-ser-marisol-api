const connection = require('../database/connection');
const ProdutoCardapio = require('../models/ProdutoCardapio');

module.exports = {
    async create(req, res) {
        const { nome, idCardapio } = req.body;
        const produtos = await ProdutoCardapio.create({
            nome,
            idCardapio,
        });
        res.json(produtos);
    },

    async index(req, res) {
        const produtosCardapio = await ProdutoCardapio.find();
        return res.json({ produtosCardapio });
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('produtosCardapio').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, idCardapio, idCategoriaProduto } = req.body;

        await connection('produtosCardapio').where('id',id)
        .update({ nome, idCardapio, idCategoriaProduto });
        res.status(204).send();
    }
}