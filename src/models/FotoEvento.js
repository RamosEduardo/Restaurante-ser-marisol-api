const mongoose = require('mongoose');

const FotoEventoSchema = new mongoose.Schema({
  imagem: String,
  evento: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true
  }
});

module.exports = mongoose.model('FotoEvento', FotoEventoSchema)