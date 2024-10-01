const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  subjects: [String]  // To store the subjects related to each user
});

module.exports = mongoose.model('User', userSchema);
