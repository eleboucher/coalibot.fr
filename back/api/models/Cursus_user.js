/**
 * Cursus_user.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "cursus_users",

  attributes: {
    id: { type: "number", autoIncrement: true },
    cursus: {
      model: "cursus",
    },
    student: {
      model: "student",
    },
    level: {
      type: "number",
      required: true,
    },
    grade: { type: "string" },
    beginAt: { type: "ref", columnType: "timestamp" },
    endAt: { type: "ref", columnType: "timestamp" },
    createdAt: { type: "number", autoCreatedAt: true },
    updatedAt: { type: "number", autoUpdatedAt: true },
  },
  updateOrCreate: function (criteria, values) {
    var self = this; // reference for use by callbacks
    // If no values were specified, use criteria
    if (!values) {
      values = criteria.where ? criteria.where : criteria;
    }

    return this.findOne(criteria).then((result) => {
      if (result) {
        return self.update(criteria, values);
      } else {
        return self.create(values);
      }
    });
  },
};
