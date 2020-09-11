
exports.up = (knex) => {
    return knex.schema.createTable('fotosEventos', (table) => {
        table.increments();
        table.string('imagem');
        table.integer('idEvento');

        table.foreign('idEvento').references('id').inTable('eventos');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('fotosEventos');
};
