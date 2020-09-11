
exports.up = (knex) => {
    return knex.schema.createTable('produtosCardapio', (table) => {
        table.increments();
        table.string('nome');
        table.integer('idCardapio');
        table.integer('idCategoriaProduto');

        table.foreign('idCardapio').references('id').inTable('cardapios');
        table.foreign('idCategoriaProduto').references('id').inTable('categoriasProduto');
    });
};

exports.down = (knex) => {
    return knex.schema.dropTable('produtosCardapio');
};
