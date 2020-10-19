const mongoose = require('mongoose');

const CardapioSchema = new mongoose.Schema({
  titulo: String,
});

module.exports = mongoose.model('Cardapio', CardapioSchema)