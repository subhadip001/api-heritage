const express = require("express");
const { VisitorCounter } = require("../models/visitorCounter");
const router = express.Router();

// Get all visitor counters
router.get("/", async (req, res) => {
  try {
    const visitorCounters = await VisitorCounter.find().exec();
    res.json(visitorCounters);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching visitor counters");
  }
});

// Create a new visitor counter
router.post("/", async (req, res) => {
  try {
    const visitorCounter = new VisitorCounter({ count: req.body.count });
    await visitorCounter.save();
    res.json(visitorCounter);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating visitor counter");
  }
});

// Increment a visitor counter
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const visitorCounter = await VisitorCounter.findByIdAndUpdate(
      id,
      { $inc: { count: 1 } },
      { new: true }
    ).exec();
    res.json(visitorCounter);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error incrementing visitor counter");
  }
});

// Decrement a visitor counter
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const visitorCounter = await VisitorCounter.findByIdAndUpdate(
      id,
      { $inc: { count: -1 } },
      { new: true }
    ).exec();
    res.json(visitorCounter);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error decrementing visitor counter");
  }
});

module.exports = router;
