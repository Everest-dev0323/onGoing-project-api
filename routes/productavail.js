const Productavail = require("../models/Productavail");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProductavail = new Productavail(req.body);

  try {
    const savedProductavail = await newProductavail.save();
    res.status(200).json(savedProductavail);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProductavail = await Productavail.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProductavail);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Productavail.findByIdAndDelete(req.params.id);
    res.status(200).json("Productavailability has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ROLE
router.get("/find/:id", async (req, res) => {
  try {
    const productavail = await Productavail.findById(req.params.id);
    res.status(200).json(productavail);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ROLE
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let productavail;

    if (qNew) {
      productavail = await Productavail.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      productavail = await Productavail.find();
    }

    res.status(200).json(productavail);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
