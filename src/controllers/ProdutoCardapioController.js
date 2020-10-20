const connection = require('../database/connection');
const ProdutoCardapio = require('../models/ProdutoCardapio');
const Cardapio = require('../models/Cardapio');

module.exports = {
    async create(req, res) {
        const { nome, cardapio } = req.body;

        const cardapioSelecionado = await Cardapio.findById({ _id: cardapio })

        const produtoCardapio = new ProdutoCardapio({ nome, cardapio })

        await produtoCardapio.save()

        cardapioSelecionado.produtos.push(produtoCardapio);

        const newProductCardapio = await cardapioSelecionado.save();

        res.json(newProductCardapio);
    },

    async index(req, res) {
        const produtosCardapio = await ProdutoCardapio.find();
        return res.json(produtosCardapio);
    },

    async delete(req, res) {
        const { id } = req.params;

        await ProdutoCardapio.findByIdAndDelete({
            _id: id
        })

        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome, idCardapio } = req.body;

        ProdutoCardapio.findOneAndUpdate({
            _id: id
        }, {
            nome
        })

        res.status(204).send();
    }
}