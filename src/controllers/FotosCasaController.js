const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const FotoCasa = require(`../models/FotoCasa`);
const { clearHaving } = require('../database/connection');

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    create(req, res) {
        console.log('req',req);
        
        const { path } = req.file;

        image2base64(path)
            .then(
                async (response) => {
                    const imagem = 'data:image/png;base64,' + response;
                    const { id } = await FotoCasa.create({
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
        const fotosCasa = await FotoCasa.find();
        return res.json(fotosCasa)
    },

    async getById(req, res) {
        const { id } = req.params;
        const foto = await connection('fotosCasa')
        .where('id',id).select('*').first();
        return res.json([foto])
    },

    async delete(req, res) {
        const { id } = req.params;
        await FotoCasa.deleteOne({ id });
        res.status(204).send({ msg: `Deletado com sucesso` });
    },
}