const path = require("path");

const express = require("express");
const app = express();

const mongoose = require("mongoose");

const questionRoutes = require("./routes/questionsRoutes");

app.set("view engine", "jsx");

app.use(questionRoutes);

mongoose
  .connect(
    "mongodb+srv://yumi:HNYp6CMgzItJL9yA@cluster0.lbe7x.mongodb.net/questions?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
