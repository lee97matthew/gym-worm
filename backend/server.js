// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");

// Setting up MongoDB Atlas Port
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: "http://localhost:3000", // React Frontend  port,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: "secretOrbitalCode",
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser("secretOrbitalCode"));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology:true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Initialize Routes
const slotsRouter = require('./routes/slots');
const usersRouter = require('./routes/users');

app.use('/slots', slotsRouter); // Slots DB
app.use('/users', usersRouter); // Users DB

/*app.post('/login', (req, res) => {
  usersRouter.findOne({email: req.body.email}, (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User already exists");
    if (!doc) {
      const 
    }
  })
});

app.post('/Signup', (req, res) => {
  console.log(req.body);
});

app.get('/routes/users', (req, res) => {})*/

// Initialize Server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});