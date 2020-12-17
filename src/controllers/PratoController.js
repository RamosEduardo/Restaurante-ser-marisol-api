const image2base64 = require('image-to-base64');
const Prato = require(`../models/Prato`);

module.exports = {
    create(req, res) {
        console.log('req',req.file);
        
        const { path } = req.file;

        image2base64(path)
            .then(
                async (response) => {
                    const imagem = 'data:image/png;base64,' + response;
                    const { id } = await Prato.create({
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
        const pratos = await Prato.find();
        return res.json(pratos)
    },

    async delete(req, res) {
        const { id } = req.params;
        await Prato.findByIdAndDelete({ _id: id });
        res.status(204).send({ msg: `Deletado com sucesso` });
    },
}