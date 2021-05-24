const router = require('express').Router();
let Slot = require('../models/slot.model');

// Main get request
router.route('/').get((req, res) => {
  Slot.find()
    .then(slots => res.json(slots))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add request
router.route('/add').post((req, res) => {
  const date = Date.parse(req.body.date);
  const startTime = Number(req.body.startTime);
  const capacity = Number(req.body.capacity);

  const newSlot= new Slot({
      date,
      startTime,
      capacity,
    });

  newSlot.save()
    .then(() => res.json('Slot created!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get one slot request by the slot's ID
router.route('/:id').get((req, res) => {
  Slot.findById(req.params.id)
    .then(slot => res.json(slot))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete one slot by the slot's ID
router.route('/:id').delete((req, res) => {
  Slot.findByIdAndDelete(req.params.id)
    .then(() => res.json('Slot deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update one slot by the slot's ID
router.route('/update/:id').post((req, res) => {
  Slot.findById(req.params.id)
    .then(slot => {
      slot.date = Date.parse(req.body.date);
      slot.startTime = Number(req.body.startTime);
      slot.capacity = Number(req.body.capacity);
      slot.bookingList = Array(req.body.bookingList);
      slot.whiteList = Array(req.body.whiteList);

      slot.save()
        .then(() => res.json('Slot updated!'))
        .catch(err =>   s.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;