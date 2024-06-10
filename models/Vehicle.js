const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const vehicleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  image: String,
});

const Vehicle = model("Vehicle", vehicleSchema);
module.exports = Vehicle;
