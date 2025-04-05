const express = require("express");
const router = express.Router();
const Car = require("../models/Car"); 

router.post("/", async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
