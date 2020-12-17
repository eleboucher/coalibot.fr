exports.up = function (knex) {
  return knex.schema.alterTable("coalitions", function (table) {
    table.integer("rank");
    table.string("slug").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("coalitions", function (table) {
    table.dropColumn("slug");
    table.dropColumn("rank");
  });
};
