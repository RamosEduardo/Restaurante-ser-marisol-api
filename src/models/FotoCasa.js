const mongoose = require('mongoose');

const FotoCasaSchema = new mongoose.Schema({
  imagem: String,
});

module.exports = mongoose.model('FotoCasa', FotoCasaSchema)