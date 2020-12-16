exports.up = function (knex) {
  return knex.schema.createTable("cursus_users", async function (table) {
    table.integer("id").notNullable().primary();
    table.decimal("level");
    table.string("grade");
    table.integer("student_id").references("id").inTable("students");
    table.integer("cursus_id").references("id").inTable("cursus");
    table.timestamp("begin_at").notNullable();
    table.timestamp("end_at");
    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON cursus_users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cursus_users");
};
