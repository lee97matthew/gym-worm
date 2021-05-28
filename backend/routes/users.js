const router = require('express').Router();
let User = require('../models/user.model');
const bcrypt = require("bcryptjs");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Add request
router.route('/add').post(async (req, res) => {
  const body = req.body;
  const user = new User(body);

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt); // Encrypting password
  user.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  /*const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = hashedPassword;

  const newUser = new User({
      email,
      firstName,
      lastName,
      password,
    });

  newUser.save()
    .then(() => res.json('User Added!'))
    .catch(err => res.status(400).json('Error: ' + err));*/
});

// Find one slot by user's email
router.route('/:email').get((req, res) => {
  User.find({email: req.params.email})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update user details by the user's email
router.route('/update/:email').post((req, res) => {
  Slot.find({email: req.params.email})
    .then(user => {
      user.email = req.body.email;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.password = req.body.password;

      user.save()
        .then(() => res.json('User Updated!'))
        .catch(err =>   s.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;