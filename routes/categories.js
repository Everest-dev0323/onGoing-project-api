const Categories = require("../models/Categories");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newCategories = new Categories(req.body);
  try {
    const savedCategories = await newCategories.save();
    return res.status(200).json(savedCategories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedCategories = await Categories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedCategories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Categories.findByIdAndDelete(req.params.id);
    return res.status(200).json("Categories has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Categories.findByIdAndDelete(item);
    })
    return res.status(200).json("Categories has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Categories
router.get("/find/:id", async (req, res) => {
  try {
    const categories = await Categories.findById(req.params.id);
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Categories
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const categories = query
      ? await Categories.find().sort({ _id: -1 }).limit(5)
      : await Categories.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
