const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
  name: String,
  email: String,
  startDate: String,
  endDate: String,
  totalPrice: Number, // ⬅️ Add this
  status: {
    type: String,
    enum: ["confirmed", "pending", "canceled"],
    default: "confirmed" // ⬅️ Default to confirmed
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
