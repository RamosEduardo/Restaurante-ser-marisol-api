
exports.up = (knex) => {
    return knex.schema.createTable('estrutura', (table) => {
        table.increments();
        table.string('titulo');
        table.string('icone');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('estrutura');
};
