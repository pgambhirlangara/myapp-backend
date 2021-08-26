const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  Q1: {
    type: String,
    required: true,
  },
  Q2A: {
    type: String,
    required: true,
  },
  Q2B: {
    type: String,
    required: true,
  },
  Q3A: {
    type: String,
    required: true,
  },
  Q3B: {
    type: String,
    required: true,
  },
  Q3C: {
    type: String,
    required: true,
  },
  Q3D: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("questions", questionsSchema);
