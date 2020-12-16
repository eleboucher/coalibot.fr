exports.up = function (knex) {
  return knex.schema.createTable("cursus", async function (table) {
    table.integer("id").notNullable().primary();
    table.string("name").notNullable();
    table.string("slug").notNullable();
    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON cursus
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cursus");
};
