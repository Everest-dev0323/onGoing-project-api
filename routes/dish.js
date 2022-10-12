const Dish = require("../models/Dish");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newDish = new Dish(req.body);

  try {
    const savedDish = await newDish.save();
    return res.status(200).json(savedDish);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedDish = await Dish.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedDish);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Dish.findByIdAndDelete(req.params.id);
    return res.status(200).json("Dish has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Dish.findByIdAndDelete(item);
    })
    return res.status(200).json("Dish has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Dish
router.get("/find/:id", async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    res.status(200).json(dish);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Dish
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const dish = query
      ? await Dish.find().sort({ _id: -1 }).limit(5)
      : await Dish.find();
    return res.status(200).json(dish);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
