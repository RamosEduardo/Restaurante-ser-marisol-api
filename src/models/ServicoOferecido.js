const mongoose = require('mongoose');

const ServicoOferecidoSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  imagem: String
});

module.exports = mongoose.model('ServicoOferecido', ServicoOferecidoSchema)