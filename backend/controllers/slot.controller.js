const db = require("../models");
const User = db.user;
const Slot = db.slot;

exports.fetchSlots = (req, res) => {
  if (req) {
    console.log("exist");
  }
  console.log(req.body.currentDate);

  //const dateFix = req.body.date + "T00:00:00.000Z";

  Slot.find({
    date: req.body.currentDate
  })
    .exec((err, slots) => {
      if (err) {
        return res.status(500).send({ message: req });
      }

      if (slots.length === 0) {
        return res.status(404).send({ message: "Slots not found." });
      }

      console.log(slots);

      return res.status(200).send({
        getSlots: slots
      });
    });

};

exports.bookSlot = (req, res) => {
  if (req) {
    console.log("exist");
  }
  console.log(req.body.slotID);
  console.log(req.body.userID + " " + req.body.email);
  Slot.findOne({ _id: req.body.slotID }, (err, slot) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    console.log("userList is " + slot.userList);
    console.log("userID is " + req.body.userID);

    slot.userList.push(req.body.userID);

    if (slot.capacity > 0) {
      slot.capacity--;
    } else { // add in wait list later on
      return res.status(400).send({ message: "Slot is already full" });
    }

    // need to add slot to the user's bookings array 

    slot.save((err, updatedSlot) => {
      if (err) {
        return res.status(400).send({ message: err })
      }
      console.log("Slot is successfully booked");
      return res.send(updatedSlot);
    });
  });
};