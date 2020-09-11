const connection = require('../database/connection');
const image2base64 = require('image-to-base64');

module.exports = {
    async create(req, res) {
        
        const { descricao, titulo } = req.params;
        const { path } = req.file;

        image2base64(path).then(
            async (response) => {
                const imagem = 'data:image/png;base64,' + response;
                const [id] = await connection('servicos').insert({
                    imagem,
                    descricao,
                    servicos_disponiveis:'',
                    titulo
                });
                res.json({ id });
            }
        ).catch(
            (error) => {
                console.log('erro',error); //Exepection error....
            }
        ) 
    },

    async index(req, res) {
        const servicos = await connection('servicos')
        .select('*');
        return res.json(servicos)
    },

    async getById(req, res) {
        const { id } = req.params;
        const servicos = await connection('servicos')
        .where('id',id)
        .select('*')
        .first();
        return res.json([servicos])
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('servicos').where('id',id).delete();
        res.status(204).send();
    },
}