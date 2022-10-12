const Grocery = require("../models/Grocery");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newGrocery = new Grocery(req.body);
  try {
    const savedGrocery = await newGrocery.save();
    return res.status(200).json(savedGrocery);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedGrocery = await Grocery.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedGrocery);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Grocery.findByIdAndDelete(req.params.id);
    return res.status(200).json("Grocery has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Grocery.findByIdAndDelete(item);
    })
    return res.status(200).json("Grocery has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Grocery
router.get("/find/:id", async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);
    res.status(200).json(grocery);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Grocery
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const grocery = query
      ? await Grocery.find().sort({ _id: -1 }).limit(5)
      : await Grocery.find();
    return res.status(200).json(grocery);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
