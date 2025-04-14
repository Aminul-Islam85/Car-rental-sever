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
  try {
    const email = req.query.email;
    const filter = email ? { email } : {};

    const bookings = await Booking.find(filter).populate("carId");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings", error: err.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Failed to cancel booking", error: err.message });
  }
});

module.exports = router;
