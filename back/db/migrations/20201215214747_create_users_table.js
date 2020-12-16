exports.up = function (knex) {
  return knex.schema.createTable("users", async function (table) {
    table.increments().primary();
    table.string("login").notNullable();
    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
