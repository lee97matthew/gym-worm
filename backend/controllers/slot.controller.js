const db = require("../models");
const User = db.user;
const Slot = db.slot;

exports.fetchSlots = (req, res) => {
  console.log("looking for " + req.body.date);
  const dateFix = req.body.date + "T00:00:00.000Z";

  Slot.find({
    date: dateFix
  })
    //.populate("date")
    .exec((err, slots) => {
      if (err) {
        return res.status(500).send({ message: err });
      }

      if (slots.length === 0) {
        return res.status(404).send({ message: "Slots not found." });
      }

      console.log(slots);

      res.status(200).send({
        slots
      });

    });

  //return res.status(405).send("help")
};