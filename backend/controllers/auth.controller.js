const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  console.log("signing up for " + req.body.email);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    creditScore: 100,
    contactNo: req.body.contactNo,
    roles: req.body.roles
  });
  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles }
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      console.log("password is valid : " + passwordIsValid);

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        console.log(user.roles);
        //authorities.push("ROLE_" + JSON.parse(JSON.stringify(user.roles[i])).name.toUpperCase());
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      console.log(authorities);

      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        creditScore: user.creditScore,
        roles: authorities,
        contactNotification: user.contactNotification,
        emailNotification: user.emailNotification,
        telegramNotification: user.telegramNotification,
        contactNo: user.contactNo,
        banStatus: user.banStatus,
        banDuration: user.banDuration,
        banStartDate: user.banStartDate,
        accessToken: token
      });
    });
};

exports.update = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (req.body.firstName !== undefined) {
        user.firstName = req.body.firstName
      }
      if (req.body.lastName !== undefined) {
        user.lastName = req.body.lastName
      }
      if (req.body.emailNotification !== undefined) {
        user.emailNotification = req.body.emailNotification
      }
      if (req.body.telegramNotification !== undefined) {
        user.telegramNotification = req.body.telegramNotification
      }
      if (req.body.contactNotification !== undefined) {
        user.contactNotification = req.body.contactNotification
      }
      if (req.body.contactNo !== undefined) {
        if (req.body.contactNo.length !== 8) {
          return res.status(401).send({
            message: "New Contact Number is Invalid!"
          });
        }
        user.contactNo = req.body.contactNo
      }
      if (req.body.creditScore !== undefined) {
        user.creditScore = req.body.creditScore
      }
      if (req.body.password !== undefined) {
        if (req.body.password.length < 6) {
          return res.status(401).send({
            message: "New Password is Invalid!"
          });
        }
        user.password = bcrypt.hashSync(req.body.password, 8)
      }
      if (req.body.bookings !== undefined) {
        user.bookings = req.body.bookings
      }
      if (req.body.banStatus !== undefined) {
        user.banStatus = req.body.banStatus
      }
      if (req.body.banDuration !== undefined) {
        user.banDuration = req.body.banDuration
      }
      if (req.body.banStartDate !== undefined) {
        user.banStartDate = req.body.banStartDate
      }
      if (req.body.telegramHandle !== undefined) {
        user.telegramHandle = req.body.telegramHandle
      }
      if (req.body.roles !== undefined) {
        user.banStartDate = req.body.roles
      }
      user.save((err, newUser) => {
        if (err) {
          return res.status(400).send({ message: err })
        }
        return res.send(newUser);
      });
    });
};

exports.updateSignin = (req, res) => {
  User.findOne({
    email: req.body.email
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }


      if (req.body.password !== user.password) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        //console.log(user.roles);
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      //console.log(authorities);

      console.log("Updated notifications for " + user.email);

      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        creditScore: user.creditScore,
        roles: authorities,
        contactNotification: user.contactNotification,
        emailNotification: user.emailNotification,
        telegramNotification: user.telegramNotification,
        contactNo: user.contactNo,
        banStatus: user.banStatus,
        banDuration: user.banDuration,
        banStartDate: user.banStartDate,
        accessToken: token
      });
    });
};