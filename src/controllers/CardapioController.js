const connection = require('../database/connection');
const _ = require('lodash');

module.exports = {
    async create(req, res) {
        const { titulo } = req.body;

        const [id] = await connection('cardapios').insert({ titulo });

        res.json({ id });
    },

    async getCategoriasCardapios() {
        console.log('Sim');
    },

    async index(req, res) {
        const categoriasCardapio = await connection('categoriasCardapio').select('*');

        const produtosCardapio = await connection('produtosCardapio')
        .join('categoriasCardapio', 'categoriasCardapio.id', '=', 'produtosCardapio.idCategoriaProduto')
        .select([
            'produtosCardapio.*',
            'categoriasCardapio.nome as categoria'
        ])

        categoriasCardapio.forEach(categoria => {
            produto = _.filter(produtosCardapio, produto => {
                produto.idCategoria === categoria.id
            });
            categoria.produtos = produto
        });

        const cardapios = await connection('cardapios').select('*');

        cardapios.forEach(cardapio => {
            const produtos = _.filter(produtosCardapio, produto => {
                console.log('Produto id Card', produto.idCardapio);
                console.log('id Card', cardapio.id);
                console.log('----------------------------');
                return produto.idCardapio === cardapio.id;
            });
            
            console.log('Produtos', produtos);

            cardapio.produtosCardapio = produtos;
        });

        return res.json(cardapios);
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('cardapios').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { titulo } = req.body;

        await connection('cardapios').where('id',id).update({ titulo });
        res.status(204).send();
    }
}