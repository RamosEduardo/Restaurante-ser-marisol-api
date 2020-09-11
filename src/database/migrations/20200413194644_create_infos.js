
exports.up = (knex) => {
    return knex.schema.createTable('infos', (table) => {
        table.increments();
        table.string('quemSomos');
        table.string('visao');
        table.string('missao');
        table.string('valores');
        table.string('nossaIdentidade');
        table.string('nossaHistoria');

    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('infos');
};
