const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        console.log(req.body);
        
        const { descricao } = req.body;

        const [id] = await connection('servicosOferecidos').insert({
            descricao,
        });

        res.json({ id });
    },

    async index(req, res) {
        const servicosOferecidos = await connection('servicosOferecidos')
        .select(
            '*'
        );
        return res.json({ servicosOferecidos })
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('servicosOferecidos').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { descricao } = req.body;
        await connection('servicosOferecidos').where('id',id)
            .update({
                descricao: descricao, 
            });
        res.status(204).send();
    }
}