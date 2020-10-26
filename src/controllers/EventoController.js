const connection = require('../database/connection');
const _ = require('lodash');

const Evento = require('../models/Evento')

module.exports = {
    async create(req, res) {
        const { titulo, data } = req.body;

        const { id } = await Evento.create({
            titulo,
            data,
        });

        res.json({ id });
    },

    async getByMonth(req, res) {
        const { mes } = req.params;
        
        const eventos = await Evento.find().populate('fotos')
        const eventosFilt = eventos.filter(i => {
            const data = new Date(i.data);
            const monthUtc = data.getUTCMonth()+1;
            return (`0`+(monthUtc).toString()) === mes
        })
        
        return res.json({eventosFilt})
    },

    async allEvents(req, res) {
        const eventos = await Evento.find();
        return res.json({ eventos})
    },

    async index(req, res) {

        let eventos = await Evento.find();
        // const now = new Date();

        // const listaEventosRecentes = [];
        // eventos.map((item, index) => {
        //     if (new Date(item.data) < now)
        //         listaEventosRecentes.push(item);
        // });
        // eventos = [...listaEventosRecentes];
        return res.json(eventos)
    },

    async getById(req, res) {
        const { id } = req.params;
        console.log('Recebeu o id: ', id);
        const evento = await Evento.findOne({
            _id: id
        }).populate('fotos');

        return res.json(evento)
    },

    async delete(req, res) {
        const { id } = req.params;
        await Evento.findOneAndDelete({
            _id: id
        })
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.body;
        const { titulo, data } = req.body;

        console.log('BODY ', req.body);

        const updated = await Evento.findOne({
            _id: id,
        })

        console.log('UPDATED ', updated);

        res.status(204).json({updated});
    }
}