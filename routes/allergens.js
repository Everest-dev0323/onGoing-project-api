const Allergens = require("../models/Allergens");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newAllergens = new Allergens(req.body);

  try {
    const savedAllergens = await newAllergens.save();
    return res.status(200).json(savedAllergens);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedAllergens = await Allergens.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedAllergens);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Allergens.findByIdAndDelete(req.params.id);
    return res.status(200).json("Allergens has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Allergens.findByIdAndDelete(item);
    })
    return res.status(200).json("Allergens has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET ALLERGEN
router.get("/find/:id", async (req, res) => {
  try {
    const allergens = await Allergens.findById(req.params.id);
    res.status(200).json(allergens);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ALLERGEN
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const allergens = query
      ? await Allergens.find().sort({ _id: -1 }).limit(5)
      : await Allergens.find();
    return res.status(200).json(allergens);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
