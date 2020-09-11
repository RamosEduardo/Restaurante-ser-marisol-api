
exports.up = function(knex) {
    return knex.schema.createTable('servicosOferecidos', function(table) {
        table.increments();
        table.string('descricao').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('servicosOferecidos');
};