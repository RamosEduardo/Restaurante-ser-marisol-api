const mongoose = require('mongoose');

const ProdutoCardapioSchema = new mongoose.Schema({
  nome: String,
  idCardapio: String
});

module.exports = mongoose.model('ProdutoCardapio', ProdutoCardapioSchema)