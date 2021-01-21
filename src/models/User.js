const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
  isAdmin: Boolean
});

module.exports = mongoose.model('User', UserSchema)