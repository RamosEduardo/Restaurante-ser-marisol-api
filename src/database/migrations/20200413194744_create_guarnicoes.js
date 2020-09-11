
exports.up = (knex) => {
    return knex.schema.createTable('guarnicoes', (table) => {
        table.increments();
        table.string('nome');
        table.integer('idCardapio');

        table.foreign('idCardapio').references('id').inTable('cardapios');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('guarnicoes');
};
