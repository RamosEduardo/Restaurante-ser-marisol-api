
exports.up = (knex) => {
    return knex.schema.createTable('cardapios', (table) => {
        table.increments();
        table.string('titulo');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('cardapios');
};
