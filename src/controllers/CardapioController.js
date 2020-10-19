const connection = require('../database/connection');
const _ = require('lodash');
const Cardapio = require('../models/Cardapio');
const ProdutoCardapio = require('../models/ProdutoCardapio');

module.exports = {
  async create(req, res) {
    const { titulo } = req.body;
    const cardapio = await Cardapio.create({
      titulo
    })
    res.json(cardapio);
  },

  async getCategoriasCardapios() {
    console.log('Sim');
  },

  async index(req, res) {
    const cardapios = await Cardapio.find();
    return res.json(cardapios);
  },

  async delete(req, res) {
    const { id } = req.params;
    await Cardapio.findByIdAndDelete({
      _id: id
    })
    res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    await connection('cardapios').where('id', id).update({ titulo });
    res.status(204).send();
  }
}