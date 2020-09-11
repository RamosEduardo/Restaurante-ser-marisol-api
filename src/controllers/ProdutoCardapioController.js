const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { nome, idCardapio, idCategoriaProduto } = req.body;
        const produtos = await connection('produtosCardapio')
        .insert({ nome, idCardapio, idCategoriaProduto });
        res.json(produtos);
    },

    async index(req, res) {
        const produtosCardapio = await connection('produtosCardapio')
        .join('categoriasCardapio', 'categoriasCardapio.id', '=', 'produtosCardapio.idCategoriaProduto')
        .select([
            'produtosCardapio.*',
            'categoriasCardapio.nome as categoria'
        ])
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