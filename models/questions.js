const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema();

module.exports = mongoose.model("questions", questionsSchema);
