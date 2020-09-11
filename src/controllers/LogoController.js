const connection = require('../database/connection');
const image2base64 = require('image-to-base64');

module.exports = {
    create(req, res) {
        const { filename } = req.file;

        console.log(filename);
        

        image2base64(filename)
            .then(
                async (response) => {
                    const imagem = 'data:image/png;base64,' + response;
                    const [id] = await connection('logo').insert({
                        imagem,
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

        const logo = await connection('logo').select('*').first();
        return res.json( logo )
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('logo').where('id',id).delete();
        res.status(204).send();
    },
}