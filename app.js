const path = require("path");
const mongoose = require("mongoose");

const express = require("express");
const app = express();

const questionRoutes = require();

mongoose
  .connect(
    "mongodb+srv://yumi:HNYp6CMgzItJL9yA@cluster0.lbe7x.mongodb.net/questions?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
