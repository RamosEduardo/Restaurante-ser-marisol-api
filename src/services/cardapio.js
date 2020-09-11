const connection = require('../database/connection');
const _ = require('lodash');

class Cardapios {

    constructor() {
        this.cardapios = []
    }

    async listCardapios() {
        const produtosCategorias = this.getProdutosCategoria();
        const capas = this.getCapasCardapios();

        capas.forEach(capa => {
            const produtos = _.filter(produtosCategorias, produto => {
                console.log('Produto id Card', produto.idCardapio);
                console.log('id Card', capa.id);
                console.log('----------------------------');
            });
            this.setCardapio(capa, produtos)
        });
    }

    static async setCardapio(capa, produtos) {
        this.cardapios.push({
            ...capa,
            produtos
        })
        console.log('this.cardapios ', this.cardapios);
    }

    static async getProdutosCategoria() {

        const categoriasCardapio = this.getCategoriasCardápio();
        const produtosCardapio = this.getProdutosCardapio()

        categoriasCardapio.forEach(categoria => {
            produto = _.filter(produtosCardapio, produto => {
                produto.idCategoria === categoria.id
            });
            categoria.produtos = produto
        });

        return categoriasCardapio;
    }

    static async getCategoriasCardapio() {
        const categoriasCardapio = await connection('categoriasCardapio').select('*');
        return categoriasCardapio;
    }

    static async getProdutosCardapio() {
        const produtosCardapio = await connection('produtosCardapio')
        .join('categoriasCardapio', 'categoriasCardapio.id', '=', 'produtosCardapio.idCategoriaProduto')
        .select([
            'produtosCardapio.*',
            'categoriasCardapio.nome as categoria'
        ])

        return produtosCardapio
    }

    static async getCapasCardapios() {
        const cardapios = await connection('cardapios').select('*');
        return cardapios
    }

}