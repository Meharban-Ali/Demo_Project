// models/User.js
const mongoose = require('mongoose');

let User;

if (mongoose.models.User) {
  User = mongoose.model('User');
} else {
  const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
  });
  User = mongoose.model('User', userSchema);
}

module.exports = User;