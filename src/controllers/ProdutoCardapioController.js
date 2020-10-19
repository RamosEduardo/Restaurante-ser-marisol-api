const connection = require('../database/connection');
const ProdutoCardapio = require('../models/ProdutoCardapio');
const Cardapio = require('../models/Cardapio');

module.exports = {
    async create(req, res) {
        const { nome, idCardapio } = req.body;

        const cardapio = await Cardapio.findById({ _id: idCardapio })

        const produtoCardapio = new ProdutoCardapio({ nome, idCardapio })
        console.log('produto ', produtoCardapio);

        const newProduct = await produtoCardapio.save()

        console.log('newProduct', newProduct);
        console.log('---');
        console.log(cardapio.produtos);
        console.log('---');
        console.log(produtoCardapio);

        await cardapio.produtos.push(produtoCardapio);

        const cardapioUpdated = await cardapio.save();

        res.json(cardapioUpdated);
    },

    async index(req, res) {
        const produtosCardapio = await ProdutoCardapio.find();
        return res.json(produtosCardapio);
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