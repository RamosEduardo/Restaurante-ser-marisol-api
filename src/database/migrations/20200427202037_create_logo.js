
exports.up = (knex) => {
    return knex.schema.createTable('logo', (table) => {
        table.increments();
        table.string('imagem');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('logo');
};
