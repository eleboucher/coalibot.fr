/**
 * Cursus.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "cursus",

  attributes: {
    id: { type: "number", required: true, unique: true },
    name: { type: "string", required: true, unique: true },
    slug: { type: "string", required: true },
    user: {
      collection: "cursus_user",
      via: "cursus",
    },
    createdAt: { type: "number", autoCreatedAt: true },
    updatedAt: { type: "number", autoUpdatedAt: true },
  },
};
