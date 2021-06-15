const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: Number, required: true },
  capacity: { type: Number, required: true, minlength: 0 },
  waitList: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
  //waitList: { type: Array, required: false },
}, {
  timestamps: true,
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;