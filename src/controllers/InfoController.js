const connection = require('../database/connection');

module.exports = {
    async create(req, res) {
        const { 
            quemSomos, 
            visao, 
            missao, 
            valores, 
            nossaIdentidade, 
            nossaHistoria 
        } = req.body;

        const [id] = await connection('infos').insert({
            quemSomos, 
            visao, 
            missao, 
            valores, 
            nossaIdentidade, 
            nossaHistoria 
        });

        res.json({ id });
    },

    async index(req, res) {
        const [informacoes] = await connection('infos')
        .select(
            '*'
        );
        return res.json(informacoes)
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('infos').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { 
            quemSomos, 
            visao, 
            missao, 
            valores, 
            nossaIdentidade, 
            nossaHistoria 
        } = req.body.info;

        await connection('infos').where('id',id)
            .update({
                quemSomos,
                visao,
                missao,
                valores,
                nossaIdentidade,
                nossaHistoria
            });
        res.status(204).send();
    }
}