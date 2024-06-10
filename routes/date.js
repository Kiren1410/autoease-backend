const express = require("express");
const router = express.Router();

const Date = require("../models/Date");
const { addNewDate } = require("../controllers/date");
router.get("/", async (req, res) => {
  try {
    const vehicleId = req.query.vehicleId;
    const dates = await Date.find({ vehicleId });
    res.status(200).send(dates);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const vehicleId = req.body.vehicleId;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const newDate = await addNewDate(vehicleId, startDate, endDate);
    res.status(200).send(newDate);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
