const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  contactNo: { type: String, required: true, minlength: 8, maxlength: 8 },
  contactNotification: { type: Boolean, required: true, default: true },
  emailNotification: { type: Boolean, required: true, default: true },
  creditScore: { type: Number, required: true, default: 100 },
  bookings: [{ type: Schema.Types.ObjectId, ref: 'Slot', required: false }],
  banStatus: { type: Boolean, required: true, default: false },
  banDuration: { type: Number, required: true, default: 0 },
  banStartDate: { type: Date, required: true, default: Date.now },
  telegramHandle: { type: String, required: false },
  telegramNotification: { type: Boolean, required: true, default: false },
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