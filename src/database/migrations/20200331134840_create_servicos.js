
exports.up = function(knex) {
    return knex.schema.createTable('servicos', function(table) {
        table.increments();
        table.string('imagem').notNullable();
        table.string('descricao').notNullable();
        table.string('servicos_disponiveis').notNullable();
        table.string('titulo').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servicos');
};