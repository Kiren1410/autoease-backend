const Vehicle = require("../models/Vehicle");

//Create
const addVehicle = async (name, description, price, category, image) => {
  try {
    const newVehicle = new Vehicle({
      name,
      description,
      price,
      category,
      image,
    });
    await newVehicle.save();
    return newVehicle;
  } catch (error) {
    throw new Error(error);
  }
};
//Read
const getVehicles = async (category, perPage = 4, page = 1) => {
  try {
    let filter = {};
    let sorted = { _id: -1 };
    if (category) {
      filter.category = category;
    }
    const vehicles = await Vehicle.find(filter)
      .populate("category")
      .limit(perPage) // 4
      .skip((page - 1) * perPage) //
      .sort({ _id: -1 });
    // .sort(sorted);
    return vehicles;
  } catch (error) {
    throw new Error(error);
  }
};

//Read - ID
const getVehicle = async (id) => {
  const vehicle = await Vehicle.findById(id);
  return vehicle;
};

//Update
const updateVehicle = async (
  vehicle_id,
  name,
  description,
  price,
  category,
  image
) => {
  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      vehicle_id,
      {
        name,
        description,
        price,
        category,
        image,
      },
      {
        new: true,
      }
    );
    return updatedVehicle;
  } catch (error) {
    throw new Error(error);
  }
};

//Delete
const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};

module.exports = {
  addVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
};
