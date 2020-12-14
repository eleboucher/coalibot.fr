/**
 * Coalition.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: "coalitions",

  attributes: {
    id: { type: "number", required: true, unique: true },
    name: { type: "string", required: true },
    slug: { type: "string", required: true },
    user: {
      collection: "coalition_user",
      via: "coalition",
    },
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
