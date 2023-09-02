const express = require("express");
const { VisitorCounter } = require("../models/visitorCounter");
const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const countDoc = await VisitorCounter.findOne();
    res.json({ count: countDoc.count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching visitor counters");
  }
});


router.post("/", async (req, res) => {
  await VisitorCounter.findOneAndUpdate(
    {},
    { $inc: { count: 1 } },
    { upsert: true }
  );
  res.json({ message: "Visitor count increased by one." });
});

module.exports = router;
