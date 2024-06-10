const express = require("express");
const router = express.Router();

const Product = require("../models/Vehicle");

const {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { isAdmin } = require("../middleware/auth");

// router.get("/", async (req, res) => {
//   try {
//     let categories = [];
//     const products = await Product.find();
//     products.forEach((product) => {
//       if (!categories.includes(product.category)) {
//         categories.push(product.category);
//       }
//     });
//     res.status(200).send(categories);
//   } catch (error) {
//     res.status(400).send({
//       message: "Cannot retreive Categories",
//     });
//   }
// });

router.get("/", async (req, res) => {
  try {
    const categories = await getCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.post("/", isAdmin, async (req, res) => {
  try {
    const name = req.body.name;
    const newCategory = await addNewCategory(name);
    res.status(200).send(newCategory);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.put("/", isAdmin, async (req, res) => {
  try {
    const category_id = req.params.id;
    const name = req.body.name;
    const updatedCategory = await updateCategory(category_id, name);
    res.status(200).send(updatedCategory);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

router.delete("/:id", isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCategory = await deleteCategory(id);
    res.status(200).send(deletedCategory);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
