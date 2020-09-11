const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { titulo, icone } = req.body;
        const [id] = await connection('estrutura').insert({
            titulo, icone
        });
        res.json({ id });
    },

    async index(req, res) {
        const estrutura = await connection('estrutura').select('*');
        return res.json({ estrutura })
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('estrutura').where('id',id).delete();
        res.status(204).send();
    },
}