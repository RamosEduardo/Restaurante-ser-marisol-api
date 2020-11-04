const connection = require('../database/connection');
const User = require('../models/User');

module.exports = {
  async create(req, res) {

    const { nome, email, senha } = req.body;
    const existente = await User.findOne({ email })

    if (existente) return res.json({msg: 'Usuário já cadastrado!'})

    const user = await User.create({
      nome,
      email,
      senha
    })

    console.log('USER ', user)

    res.json({ user, msg: 'Criado com Sucesso' });
  },

  async index(req, res) {
    const user = await connection('user').select('*');
    return res.json({user});
  },

  async delete(req, res) {
    const { email } = req.params;
    const existente = await User.findOne({ email })

    if (!existente) res.status(400).json({ msg: 'Usuário não existe'})
    
    const deleted = await User.deleteOne({
      email
    });

    res.status(204).json(deleted);
  },

  async update(req, res) {
    const { email, senha, senhaAntiga } = req.body;

    const [existente] = await connection('user').select('*').where('email', email).andWhere('senha', senhaAntiga);

    if (!existente) res.status(400)

    await connection('user').where('email', email).update({ senha });
    res.status(204);
  },

  async login(req, res) {
    const { email, senha } = req.body;
    console.log('LOGIN', email);
    console.log(senha);
    const existente = await User.findOne({ email: email })
    console.log(existente);
    if (!existente) { 
      return res.json({
        status: 400,
        msg: 'Usuário Não existe!'
      })
    }
    else if (existente.senha !== senha) return res.json({
      msg: 'Senha Incorreta!',
      status: 400
    })

    return res.json({
      msg: 'Login Efetuado com Sucesso!',
      status: 200,
    });
  }
}