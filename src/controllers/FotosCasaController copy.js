const connection = require('../database/connection');
const image2base64 = require('image-to-base64');

module.exports = {
    async create(req, res) {
        console.log(req.body);
        
        const { imagem } = req.body;
        const [id] = await connection('fotosCasa').insert({
            imagem,
        });
        res.json({ id });
    },

    async index(req, res) {
        const fotosCasa = await connection('fotosCasa').select('*');
        return res.json({ fotosCasa })
    },

    async getById(req, res) {
        const { id } = req.params;
        const foto = await connection('fotosCasa')
        .where('id',id).select('*').first();
        return res.json([foto])
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('fotosCasa').where('id',id).delete();
        res.status(204).send();
    },
}