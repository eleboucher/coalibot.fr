exports.up = function (knex) {
  return knex.schema.alterTable("coalitions", function (table) {
    table.renameColumn("login", "name");
  });
};

exports.down = function (knex) {
  return knex.schema.alterTable("coalitions", function (table) {
    table.renameColumn("name", "login");
  });
};
