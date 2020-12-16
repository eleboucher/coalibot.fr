const knex = require("../db/knex");

const createOrUpdate = async (tableName, criteria, values) => {
  return await knex.transaction(async (trx) => {
    let obj = await trx(tableName).where(criteria);
    switch (obj.length) {
      case 0: {
        obj = await trx(tableName).insert(values, ["*"]);
        break;
      }
      case 1: {
        obj = await trx(tableName).where(criteria).update(values, ["*"]);
        break;
      }
      default: {
        throw "too many obj";
      }
    }

    return obj[0];
  });
};

module.exports = createOrUpdate;
