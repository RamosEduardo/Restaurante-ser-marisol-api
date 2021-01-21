const image2base64 = require('image-to-base64');

const FotoEvento = require('../models/FotoEvento');
const Evento = require('../models/Evento');

module.exports = {
    create(req, res) {
        const { evento } = req.params;
        const { path } = req.file;

        image2base64(path)
            .then(
                async (response) => {

                    const eventoSelecionado = await Evento.findById({ _id: evento })
                    const imagem = 'data:image/png;base64,' + response;
                    const produtoCardapio = new FotoEvento({ imagem, evento })
                    await produtoCardapio.save()
                    
                    eventoSelecionado.fotos.push(produtoCardapio);
            
                    const novaFotoEvento = await eventoSelecionado.save();
                    
                    res.json(novaFotoEvento);
                }
            ).catch(
                (error) => {
                    console.log('erro',error); //Exepection error....
                }
            )    
    },

    async index(req, res) {

        const fotosEvento = await FotoEvento.find();

        return res.json({ fotosEvento })
    },

    async getById(req, res) {
        const { id } = req.params;
        
        const evento = await FotoEvento.findOne({
            _id: id
        })

        return res.json(evento)
    },

    async delete(req, res) {
        try {
            const { id } = req.params;
            await FotoEvento.findByIdAndDelete({
                _id: id
            });
            res.status(204).send();
        } catch (error) {
            throw new Error(error)
        }
    },

    async update(req, res) {
        const { id } = req.params;
        const { imagem, evento } = req.body;

        FotoEvento.findOneAndUpdate({
            _id: id
        }, {
            imagem,
            evento
        })
        res.status(204).send();
    }
}