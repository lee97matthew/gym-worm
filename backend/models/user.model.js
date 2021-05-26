const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  creditScore: {type: Number, required: true, default: 0 },
  bookings: { type: Array, required: false },
  ban: { 
      duration: { type: Number, required: false },
      startDate:  { type: Date, required: false },
    } 
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;