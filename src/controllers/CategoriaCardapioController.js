const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { nome } = req.body;

        const [id] = await connection('categoriasCardapio')
        .insert({ nome });

        res.json({ id });
    },

    async index(req, res) {
        const categoriasCardapio = await connection('categoriasCardapio').select('*');
        return res.json({ categoriasCardapio });
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('categoriasCardapio').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { nome } = req.body;

        await connection('categoriasCardapio').where('id',id).update({ nome });
        res.status(204).send();
    }
}