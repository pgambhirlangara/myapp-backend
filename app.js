const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const cors = require("cors");
const path = require("path");
const port = process.env.PORT || 3001;

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

// app.use((req, res, next) => {
//   res.locals.isAuthenticated = req.session.isLoggedIn;
//   // res.locals.csrfToken = req.csrfToken();
//   console.log("hello");
//   next();
// });

app.use('/', (req,res) => {
  res.send("API END POINT");
})

app.use("/questions", questionRoutes);
app.use("/result", resultsRoutes);
app.use(authRoutes);

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "build")));
// Anything that doesn't match the above, send back index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

//connect to mongoose
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then((result) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("port is running");
});
