exports.up = function (knex) {
  return knex.schema.createTable("students", async function (table) {
    table.integer("id").notNullable().primary();
    table.string("login").notNullable();
    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON students
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("students");
};
