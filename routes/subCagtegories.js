const subCategories = require("../models/Subcategories");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newsubCategories = new subCategories(req.body);
  try {
    const savedsubCategories = await newsubCategories.save();
    return res.status(200).json(savedsubCategories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedsubCategories = await subCategories.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedsubCategories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await subCategories.findByIdAndDelete(req.params.id);
    return res.status(200).json("subCategories has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await subCategories.findByIdAndDelete(item);
    })
    return res.status(200).json("subCategories has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET subCategories
router.get("/find/:id", async (req, res) => {
  try {
    const subcategories = await subCategories.findById(req.params.id);
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL subCategories
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const subcategories = query
      ? await subCategories.find().sort({ _id: -1 }).limit(5)
      : await subCategories.find();
    return res.status(200).json(subcategories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
