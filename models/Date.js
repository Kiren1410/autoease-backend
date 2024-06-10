const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const dateSchema = new Schema({
  vehicleId: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
});

const Date = model("Date", dateSchema);
module.exports = Date;
