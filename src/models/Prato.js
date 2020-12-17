const mongoose = require('mongoose');

const PratoSchema = new mongoose.Schema({
  imagem: String,
  titulo: String
});

module.exports = mongoose.model('Prato', PratoSchema)