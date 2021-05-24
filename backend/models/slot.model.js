const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: Number, required: true },
  capacity: { type: Number, required: true, minlength: 0 },
  bookingList: { type: Array, required: false },
  whiteList: { type: Array, required: false },
}, {
  timestamps: true,
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;