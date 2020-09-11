
exports.up = (knex) => {
    return knex.schema.createTable('categoriasCardapio', (table) => {
        table.increments();
        table.string('nome');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('categoriasCardapio');
};
