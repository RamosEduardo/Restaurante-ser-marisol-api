const connection = require('../database/connection');
const image2base64 = require('image-to-base64');

module.exports = {
    create(req, res) {
        console.log('param',req.params);
        console.log('req',req);
        
        const { idEvento } = req.params;
        const { path } = req.file;

        image2base64(path)
            .then(
                async (response) => {
                    const imagem = 'data:image/png;base64,' + response;
                    const [id] = await connection('fotosEventos').insert({
                        imagem,
                        idEvento,
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

        const fotosEvento = await connection('fotosEventos').select('*');

        return res.json({ fotosEvento })
    },

    async getById(req, res) {
        const { id } = req.params;
        
        const evento = await connection('fotosEventos')
        .where('id',id).select('*').first();

        return res.json([evento])
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('fotosEventos').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.params;
        const { imagem, idEvento } = req.body;
        await connection('fotosEventos').where('id',id)
            .update({
                imagem: imagem, 
                idEvento: idEvento,
            });
        res.status(204).send();
    }
}