const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");

// const csrf = require("csurf");

//import models
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://yumi:HNYp6CMgzItJL9yA@cluster0.lbe7x.mongodb.net/questions?retryWrites=true&w=majority";

const app = express();

//Store session in the MongoDBStore
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

// const Protection = csrf();

//import routes
const questionRoutes = require("./routes/questionsRoutes");
const resultsRoutes = require("./routes/resultsRoutes");
const authRoutes = require("./routes/auth");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//initialize session
app.use(
  session({
    secret: "my secret id",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

// app.use(csrfProtection);

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

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken();
//   console.log("hello");
//   next();
// });

app.use("/questions", questionRoutes);
app.use("/result", resultsRoutes);
app.use(authRoutes);

mongoose.set("useUnifiedTopology", true);

//connect to mongoose
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("connected");
    app.listen(3001);
  })
  .catch((err) => {
    console.log(err);
  });
