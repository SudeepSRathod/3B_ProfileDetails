const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  qualification: { type: String, required: true },
  address: { type: String, required: true },
  gender: { type: String, required: true },
  skills: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
