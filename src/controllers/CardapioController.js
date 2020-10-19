const connection = require('../database/connection');
const _ = require('lodash');
const Cardapio = require('../models/Cardapio');
const ProdutoCardapio = require('../models/ProdutoCardapio');
const ObjectId = require(`mongodb`)

module.exports = {
  async create(req, res) {
    const { titulo } = req.body;
    const { id } = await Cardapio.create({
      titulo
    })

    res.json({ id });
  },

  async getCategoriasCardapios() {
    console.log('Sim');
  },

  async index(req, res) {
    // const cardapios = await Cardapio.find();
    const produtosCardapios = ProdutoCardapio.find()
    // cardapios.forEach(async (cardapio) => {
    //   cardapio.produtosCardapio = await ProdutoCardapio.find({
    //     idCardapio: new ObjectId(cardapio._id)
    //   });
    // });

    return res.json(produtosCardapios);
  },

  async delete(req, res) {
    const { id } = req.params;
    await connection('cardapios').where('id', id).delete();
    res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    await connection('cardapios').where('id', id).update({ titulo });
    res.status(204).send();
  }
}