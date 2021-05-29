// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");


// Setting up MongoDB Atlas Port
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware

app.use(cors({
  origin: "http://localhost:3000", // React Frontend  port,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;

// Opening connection to MongoDB
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useUnifiedTopology:true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})
  .catch(err => {
    console.error("Connection Error", err);
    process.exit();
});

// Initialize Routes
const slotsRouter = require('./routes/slots');
const usersRouter = require('./routes/users');

app.use('/slots', slotsRouter); // Slots DB
app.use('/users', usersRouter); // Users DB

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gym Worm." });
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

/*app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})*/

// Initialize Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});