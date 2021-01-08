const _ = require('lodash');
const Cardapio = require('../models/Cardapio');

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
    const cardapios = await Cardapio.find().populate(`produtos`);
    return res.json(cardapios);
  },

  async delete(req, res) {
    const { id } = req.params;

    console.log('ID RECEBIDO');

    const resp = await Cardapio.findByIdAndDelete({
      _id: id
    })

    console.log('RESP ', resp);

    res.status(204).send();
  },

  async update(req, res) {
    const { id } = req.params;
    const { titulo } = req.body;

    const updated = await Cardapio.findOneAndUpdate({
      _id: id
    },
    {
      titulo
    })

    // await connection('cardapios').where('id', id).update({ titulo });
    res.status(204).json({ updated });
  }
}