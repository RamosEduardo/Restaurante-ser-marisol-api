const mongoose = require('mongoose');

const ProdutoCardapioSchema = new mongoose.Schema({
  nome: String,
  cardapio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cardapio',
    required: true
  }
});

module.exports = mongoose.model('ProdutoCardapio', ProdutoCardapioSchema)