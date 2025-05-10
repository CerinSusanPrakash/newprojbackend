const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, minlength: 3, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  userId: { type: String, unique: true }
});

module.exports = mongoose.model('User', userSchema);

