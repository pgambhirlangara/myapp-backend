const path = require("path");

const express = require("express");
const app = express();

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session");
const MONGODB_URI =
  "mongodb+srv://yumi:HNYp6CMgzItJL9yA@cluster0.lbe7x.mongodb.net/questions?retryWrites=true&w=majority";

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const Questions = require("./models/questions");

const questionRoutes = require("./routes/questionsRoutes");

app.set("view engine", "jsx");
app.use(
  session({
    secret: "my secret id",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  Questions.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use(questionRoutes);

mongoose
  .connect()
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
