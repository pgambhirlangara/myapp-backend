const path = require("path");

const express = require("express");

const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require("csurf");
const flash = require("connect-flash");

// var cors = require("cors");

const Questions = require("./models/questions");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://yumi:HNYp6CMgzItJL9yA@cluster0.lbe7x.mongodb.net/questions?retryWrites=true&w=majority";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// const Protection = csrf();

app.set("view engine", "jsx");

const questionRoutes = require("./routes/questionsRoutes");
const authRoutes = require("./routes/auth");

app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "my secret id",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use(csrfProtection);
app.use(flash());
// app.use(cors());

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  // res.locals.csrfToken = req.csrfToken();
  console.log("hello");
  next();
});

app.use("/questions", questionRoutes);
app.use(authRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
