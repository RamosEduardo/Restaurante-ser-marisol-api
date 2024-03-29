const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const CardapioSchema = new mongoose.Schema({
  titulo: String,
  produtos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProdutoCardapio'
  }]
});

module.exports = mongoose.model('Cardapio', CardapioSchema)