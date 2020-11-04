const _ = require('lodash');

const Evento = require('../models/Evento')

const { ObjectId } = require('mongodb')

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
        const eventos = await Evento.find().populate('fotos');
        return res.json(eventos)
    },

    async getById(req, res) {
        const { id } = req.params;
        const test = await Evento.findById(id).populate('fotos')
        return res.json(test)
    },

    async delete(req, res) {
        const { id } = req.params;
        await Evento.findByIdAndDelete(id)
        res.status(204).send();
    },

    async update(req, res) {
        try {
            const novo = await Evento.updateOne(
                { _id: ObjectId(req.body._id) },
                {
                  $set: {
                    titulo: req.body.titulo,
                    data: req.body.data,
                  }
                }
             )
           
            res.json({ novo });
        } catch (error) {
            throw new Error(error)
        }
    },
}