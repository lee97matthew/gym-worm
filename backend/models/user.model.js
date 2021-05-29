const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  creditScore: {type: Number, required: true, default: 0 },
  bookings: { type: Array, required: false },
  banStatus: { type: Boolean, required: true, default: false},
  banDuration: { type: Number, required: true, default: 0 },
  banStartDate: { type: Date, required: true, default: Date.now },
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role"
    }
  ]
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;