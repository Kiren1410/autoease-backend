const express = require("express");

const {
  addVehicle,
  getVehicles,
  getVehicle,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicle");

// set up product router
const router = express.Router();
const { isUserValid, isAdmin } = require("../middleware/auth");
const Vehicle = require("../models/Vehicle");

// get products
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getVehicles(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    res.status(200).send(await Vehicle.findById(req.params.id));
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const newVehicle = await addVehicle(
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(newVehicle);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", isAdmin, async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;
    const updatedVehicle = await updateVehicle(
      req.params.id,
      name,
      description,
      price,
      category,
      image
    );
    res.status(200).send(updatedVehicle);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await deleteVehicle(id);
    res.status(200).send({ message: `Vehicle #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
