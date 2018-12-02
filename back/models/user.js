const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const usersSchema = new mongoose.Schema({
  login: {
    type: String,
    maxlength: 50,
    required: true,
  },
});
usersSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', usersSchema);
