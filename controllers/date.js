const Date = require("../models/Date");

const addNewDate = async (vehicleId, startDate, endDate) => {
  const newDate = new Date({
    vehicleId: vehicleId,
    startDate: startDate,
    endDate: endDate,
  });
  await newDate.save();
  return newDate;
};

const getDates = async (vehicleId) => {
  const dates = await Date.find({ vehicleId });
  return dates;
};

module.exports = {
  addNewDate,
  getDates,
};
