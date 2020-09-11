const connection = require('../database/connection');
const _ = require('lodash');

module.exports = {
    async create(req, res) {
        const { titulo, data } = req.body;

        const [id] = await connection('eventos').insert({
            titulo,
            data,
        });

        res.json({ id });
    },

    async getByMonth(req, res) {
        const { mes } = req.params;
        
        const eventos = await connection('eventos').select(`*`)
        const eventosFilt = eventos.filter(i => {
            const data = new Date(i.data);
            const monthUtc = data.getUTCMonth()+1;
            return (`0`+(monthUtc).toString()) === mes
        })
        
        return res.json({eventosFilt})
    },

    async allEvents(req, res) {
        const eventos = await connection('eventos').select(['eventos.*']);
        return res.json({ eventos})
    },

    async index(req, res) {

        let eventos = await connection('eventos').select(['eventos.*']);
        const now = new Date();

        const listaEventosRecentes = [];
        eventos.map((item, index) => {
            if (new Date(item.data) < now)
                listaEventosRecentes.push(item);
        });
        eventos = [...listaEventosRecentes];
        return res.json(eventos)
    },

    async getById(req, res) {
        const { id } = req.params;
        console.log('Recebeu o id: ', id);
        const evento = await connection('eventos')
        .where('id',id).select('*').first();

        const imagens = await connection(`fotosEventos`)
        .where(`idEvento`,evento.id)
        .select(`*`)

        evento.fotos = imagens;

        return res.json(evento)
    },

    async delete(req, res) {
        const { id } = req.params;
        await connection('eventos').where('id',id).delete();
        res.status(204).send();
    },

    async update(req, res) {
        const { id } = req.body;
        const { titulo, data } = req.body;
        await connection('eventos').where('id',id)
            .update({
                titulo: titulo, 
                data: data, 
            });
        res.status(204).send();
    }
}