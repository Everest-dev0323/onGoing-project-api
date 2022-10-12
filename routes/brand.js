const Brand = require("../models/Brand");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newBrand = new Brand(req.body);

  try {
    const savedBrand = await newBrand.save();
    res.status(200).json(savedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBrand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Brand.findByIdAndDelete(req.params.id);
    res.status(200).json("Brand has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET BRAND
router.get("/find/:id", async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    res.status(200).json(brand);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL BRAND
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let brand;

    if (qNew) {
      brand = await Brand.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      data = await Brand.find();
    }

    res.status(200).json({data});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
