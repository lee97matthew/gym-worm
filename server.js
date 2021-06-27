// Imports
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Setting up MongoDB Atlas Port
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

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
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
  initial();
})
  .catch(err => {
    console.error("Connection Error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// Initialize Routes
//    -- old routes
//const slotsRouter = require('./routes/slots');
//const usersRouter = require('./routes/users');

//app.use('/slots', slotsRouter); // Slots DB
//app.use('/users', usersRouter); // Users DB

//    -- new routes

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/slot.routes')(app);

// Error handling, disable for now
/*app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})*/

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send("API Running, Welcome to Gym Worm!");
  });
}

// Initialize Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});