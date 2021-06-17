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

  //return res.status(405).send("help")
};