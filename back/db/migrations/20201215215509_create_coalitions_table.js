exports.up = function (knex) {
  return knex.schema.createTable("coalitions", async function (table) {
    table.integer("id").notNullable().primary();
    table.string("login").notNullable();
    table.string("color").notNullable();
    table.float("score").notNullable();
    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON coalitions
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coalitions");
};
