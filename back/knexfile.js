// Update with your config settings.

module.exports = {
  client: "pg",
  connection: process.env.DATABASE_URL || "postgres://localhost:5432/coalibot",
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: __dirname + "/db/migrations",
  },
};
