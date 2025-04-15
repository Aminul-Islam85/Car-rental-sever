const express = require("express");
const router = express.Router();
const Car = require("../models/Car"); 

// Add new car
router.post("/", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all cars
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// ✅ Get car by ID (this is what you're missing!)
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCar = new Car({
      ...req.body,
      addedBy: req.body.email, // include user's email in request
    });
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const email = req.query.email;
    const filter = email ? { addedBy: email } : {};

    const cars = await Car.find(filter);
    res.json(cars);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    res.json({ message: "Car deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car", error: err.message });
  }
});

// Update car
router.put("/:id", async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});





module.exports = router;
