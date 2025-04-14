const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  model: String,
  dailyPrice: Number,
  availability: String,
  registrationNumber: String,
  features: [String],
  description: String,
  image: String,
  location: String,
  addedBy: String,
});

module.exports = mongoose.model("Car", carSchema);
