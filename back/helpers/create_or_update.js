const knex = require("../db/knex");

const createOrUpdate = async (tableName, criteria, values) => {
  return await knex.transaction(async (trx) => {
    let obj = await trx(tableName).where(criteria);
    let action;
    switch (obj.length) {
      case 0: {
        action = "created";
        obj = await trx(tableName).insert(values, ["*"]);
        break;
      }
      case 1: {
        delete values.id;
        action = "updated";
        obj = await trx(tableName).where(criteria).update(values, ["*"]);
        break;
      }
      default: {
        throw "too many obj";
      }
    }

    return [obj[0], action];
  });
};

module.exports = createOrUpdate;
