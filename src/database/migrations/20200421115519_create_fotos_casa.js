
exports.up = (knex) => {
    return knex.schema.createTable('fotosCasa', (table) => {
        table.increments();
        table.string('imagem');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('fotosCasa');
};
