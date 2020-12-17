const connection = require('../database/connection');
const image2base64 = require('image-to-base64');
const Prato = require(`../models/Prato`);
const { clearHaving } = require('../database/connection');

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

module.exports = {
    create(req, res) {
        const { path } = req.file;

        image2base64(path)
            .then(
                async (response) => {
                    const imagem = 'data:image/png;base64,' + response;
                    const { id } = await Prato.create({
                        imagem,
                        titulo: req.params.titulo
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
        const pratos = await Prato.find();
        return res.json(pratos)
    },

    async delete(req, res) {
        const { id } = req.params;
        console.log('Params ', req.params)
        await Prato.findByIdAndDelete({ _id: id });
        res.status(204).send({ msg: `Deletado com sucesso` });
    },
}