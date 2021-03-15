const { ObjectID } = require('mongodb');
const connection = require('../database/connection');
const User = require('../models/User');

module.exports = {
  async create(req, res) {

    const { nome, email, senha, isAdmin } = req.body;
    const existente = await User.findOne({ email })

    if (existente) return res.json({ msg: 'Usuário já cadastrado!' })

    const user = await User.create({
      nome,
      email,
      senha,
      isAdmin
    })

    res.json({ user, msg: 'Criado com Sucesso' });
  },

  async index(req, res) {
    const user = await User.find();
    return res.json(user);
  },

  async delete(req, res) {
    const { email } = req.body;
    const existente = await User.findOne({ email })

    if (!existente) res.status(400).json({ msg: 'Usuário não existe' })

    const deleted = await User.deleteOne({
      email
    });

    res.status(204).json(deleted);
  },

  async update(req, res) {
    const { email, senhaAntiga, novaSenha } = req.body;
    const existente = await User.findOne({ email: email })

    if (!existente) {
      return res.json({
        status: 400,
        msg: 'Usuário Não existe!'
      })
    }
    if (existente.senha !== senhaAntiga) return res.json({
      msg: 'Senha Incorreta!',
      status: 400
    })

    existente.senha = novaSenha

    console.log('SENHA ', existente.senha)

    const retorno = await User.findByIdAndUpdate(new ObjectID(existente._id), existente)

    console.log(retorno)

    res.json({
      msg: 'Senha Alterada!',
      status: 200
    })
  },

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const existente = await User.findOne({ email: email })
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

      console.log('ADMIN ', existente)

      return res.json({
        msg: 'Login Efetuado com Sucesso!',
        isAdmin: existente.isAdmin,
        status: 200,
      });
    } catch (error) {
      return new Error(error)
    }

  }
}