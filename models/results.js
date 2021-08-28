const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const resultsSchema = new Schema();

module.exports = mongoose.model("results", resultsSchema);
