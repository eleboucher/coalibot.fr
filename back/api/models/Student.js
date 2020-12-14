/**
 * Student.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "students",
  attributes: {
    id: { type: "number", required: true, unique: true },
    login: { type: "string", required: true, unique: true },
    user: {
      collection: "user",
      via: "student",
    },
    cursus: {
      collection: "cursus_user",
      via: "student",
    },
  },
};
