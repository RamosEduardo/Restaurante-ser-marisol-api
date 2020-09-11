const connection = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { email, senha } = req.body;
    console.log('EMAIL ', email);
    console.log('senha ', senha);
    const [existente] = await connection('user').select('*').where('email', email);

    if (existente) {
      res.json('Usuário já cadastrado!')
    }

    const [id] = await connection('user')
      .insert({ email, senha });

    res.json({ id, msg: 'Criado com Sucesso' });
  },

  async index(req, res) {
    const user = await connection('user').select('*');
    return res.json({user});
  },

  async delete(req, res) {
    const { id } = req.params;
    const [existente] = await connection('user').select('*').where('id', id);
    
    if (!existente) res.status(400).json({ msg: 'Usuário não existe'})
    
    await connection('user').where('id', id).delete();
    res.status(204);
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

    console.log('Email ', email);

    const [existente] = await connection('user').select('*').where('email', email);

    console.log('Existente ', existente);

    if (!existente) res.status(400).json({ msg: 'Usuário Não existe!' })

    if (existente.senha !== senha) res.status(400).json({ msg: 'Senha Incorreta!' })

    res.json({ msg: 'Login Efetuado com Sucesso!'});
  }
}