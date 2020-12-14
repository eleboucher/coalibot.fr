/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "users",
  attributes: {
    id: { type: "number", autoIncrement: true },
    login: { type: "string", required: true, unique: true },
    student: {
      model: "student",
      unique: true,
    },
    createdAt: { type: "number", autoCreatedAt: true },
    updatedAt: { type: "number", autoUpdatedAt: true },
  },
};
