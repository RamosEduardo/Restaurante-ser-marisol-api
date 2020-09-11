
exports.up = (knex) => {
    return knex.schema.createTable('eventos', (table) => {
        table.increments();
        table.string('titulo');
        table.string('data');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('eventos');
};
