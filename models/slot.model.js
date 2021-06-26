const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const slotSchema = new Schema({
  date: { type: Date, required: true },
  startTime: { type: Number, required: true },
  capacity: { type: Number, required: true, minlength: 0 },
  fullCapacity: { type: Number, required: true, minlength: 0 },
  userList: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  waitList: [{ type: Schema.Types.ObjectId, ref: 'User', required: false }],
}, {
  timestamps: true,
});

const Slot = mongoose.model('Slot', slotSchema);

module.exports = Slot;