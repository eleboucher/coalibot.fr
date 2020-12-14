/**
 * Coalition_user.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "coalition_users",

  attributes: {
    id: { type: "number", autoIncrement: true },
    coalition: {
      model: "coalition",
    },
    student: {
      model: "student",
    },
    score: { type: "number" },
    rank: { type: "number" },
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
