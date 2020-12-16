exports.up = function (knex) {
  return knex.schema.createTable("coalitions_users", async function (table) {
    table.integer("id").notNullable().primary();
    table.integer("rank");
    table.integer("score");
    table.integer("student_id").references("id").inTable("students");
    table.integer("coalition_id").references("id").inTable("coalitions");

    table.timestamps(false, true);

    await knex.raw(`
    CREATE TRIGGER update_timestamp
    BEFORE UPDATE
    ON coalitions_users
    FOR EACH ROW
    EXECUTE PROCEDURE update_timestamp();
  `);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("coalitions_users");
};
