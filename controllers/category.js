const Product = require("../models/Vehicle");
const Category = require("../models/category");

const getCategories = async () => {
  //old
  // let categories = [];
  // const products = await Product.find();
  // products.forEach((product) => {
  //   if (!categories.includes(product.category)) {
  //     categories.push(product.category);
  //   }
  // });

  //new
  const categories = await Category.find().sort({ name: 1 });
  return categories;
};

const addNewCategory = async (name) => {
  const newCategory = new Category({
    name: name,
  });
  await newCategory.save();
  return newCategory;
};

const updateCategory = async (name) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    _id,
    {
      name: name,
    },
    {
      new: true,
    }
  );
  return updatedCategory;
};

const deleteCategory = async (_id) => {
  // make sure there is no category being assigned to the products
  const products = await Product.find({ category: _id });
  //if products is not empty
  if (products && products.length > 0) {
    throw new Error("This category is in use");
  }
  const deletedCategory = await Category.findByIdAndDelete(_id);
  return deletedCategory;
};

module.exports = {
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
};
