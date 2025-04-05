const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to save booking", error: err.message });
  }
});

router.get("/", async (req, res) => {
  const userEmail = req.query.email;

  if (!userEmail) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const bookings = await Booking.find({ email: userEmail }).populate("carId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});


module.exports = router;
