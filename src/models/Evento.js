const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

const EventoSchema = new mongoose.Schema({
  titulo: String,
  data: Date,
  fotos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FotoEvento'
  }]
});

module.exports = mongoose.model('Evento', EventoSchema)