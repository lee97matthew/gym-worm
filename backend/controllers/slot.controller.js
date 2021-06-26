const db = require("../models");
const User = db.user;
const Slot = db.slot;
const Booking = db.booking;

exports.createSlot = (req, res) => {
  if (req) {
    console.log("createSlot req exist");
  }

  const date = Date.parse(req.body.date);
  const startTime = Number(req.body.startTime);
  const capacity = Number(req.body.capacity);
  const fullCapacity = Number(req.body.capacity);

  const newSlot = new Slot({
    date,
    startTime,
    capacity,
    fullCapacity
  });

  newSlot.save()
    .then(() => res.send({ message: 'Slot Created!' }))
    .catch(err => res.status(500).json('Error: ' + err));
}

exports.updateSlot = (req, res) => {
  if (req) {
    console.log("updateSlot req exist");
  }

  Slot.findOne({ _id: req.body.slotID }, (err, slot) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.startTime !== undefined) {
      slot.startTime = req.body.startTime
    }
    if (req.body.capacity !== undefined) {
      slot.capacity = req.body.capacity
    }
    if (req.body.fullCapacity !== undefined) {
      slot.fullCapacity = req.body.fullCapacity
    }
    if (req.body.date !== undefined) {
      slot.date = Date.parse(req.body.date)
    }

    slot.save((err, updatedSlot) => {
      if (err) {
        return res.status(400).send({ message: err })
      }
      console.log("Slot is successful updated");
      return res.send(updatedSlot);
    });
  });
}

exports.fetchSlots = (req, res) => {
  if (req) {
    console.log("fetchSlots req exist");
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
    console.log("bookSlot req exist");
  }
  console.log("slot id " + req.body.slotID);
  console.log("user id " + req.body.userID + " user email " + req.body.userEmail);
  Slot.findOne({ _id: req.body.slotID }, (err, slot) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    //console.log("userList is " + slot.userList);
    //console.log("userID is " + req.body.userID);

    slot.userList.push(req.body.userID);

    if (slot.capacity > 0) {
      slot.capacity--;
    } else { // add in wait list later on
      return res.status(400).send({ message: "Slot is already full" });
    }

    slot.save((err, updatedSlot) => {
      if (err) {
        return res.status(400).send({ message: err })
      }
      console.log("Slot booking is successful");
      return res.send(updatedSlot);
    });
  });
};

exports.recordBooking = (req, res) => {
  if (req) {
    console.log("recordBooking req exist");
  }
  console.log("slot id " + req.body.slotID);
  console.log("user id " + req.body.userID);

  const newBooking = new Booking({
    user: req.body.userID,
    slot: req.body.slotID,
    dateOfBooking: new Date()
  });

  newBooking.save((err, booking) => {
    if (err) {
      return res.status(400).send({ message: err })
    }
    console.log("Booking is successfully recorded");
    console.log("Adding booking to user's records");

    console.log("Booking id is " + booking.id);

    User.findOne({
      _id: req.body.userID
    })
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (booking.id !== undefined) {
          user.bookings.push({ _id: booking.id });
        }

        user.save((err, newUser) => {
          if (err) {
            return res.status(400).send({ message: err })
          }
          //return res.status(200).send(newUser);
        });
      });

    return res.send(booking);
  });
};

exports.cancelledBooking = (req, res) => {
  if (req) {
    console.log("cancelledSlot req exist");
  }
  console.log("slot id " + req.body.slotID);
  console.log("user id " + req.body.userID);
  Slot.findOne({ _id: req.body.slotID }, (err, slot) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    slot.userList.pull({ _id: req.body.userID });


    slot.capacity++;


    slot.save((err, updatedSlot) => {
      if (err) {
        return res.status(400).send({ message: err })
      }
      console.log("Slot cancellation and update is successful");
      return res.send(updatedSlot);
    });
  });
};

exports.retrieveSlot = (req, res) => {
  if (req) {
   console.log("retrieveSlot req exist");
  }
  console.log(req.body.bookingID);

  Booking.find({
    _id: req.body.bookingID
  })
    .exec((err, booking) => {
      if (err) {
        return res.status(500).send({ message: req });
      }

      console.log(booking);
      //console.log(booking[0].slot);

      Slot.findOne({ _id: booking[0].slot }, (err, slot) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        return res.status(200).send({slot}); 
      });
    });
};