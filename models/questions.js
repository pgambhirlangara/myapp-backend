const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("questions", questionsSchema);
