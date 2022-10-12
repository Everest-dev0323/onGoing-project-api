const Attribute = require("../models/Attribute");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newAttribute = new Attribute(req.body);

  try {
    const savedAttribute = await newAttribute.save();
    res.status(200).json(savedAttribute);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedAttribute = await Attribute.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAttribute);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Attribute.findByIdAndDelete(req.params.id);
    res.status(200).json("Attribute has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ATTRIBUTE
router.get("/find/:id", async (req, res) => {
  try {
    const attribute = await Attribute.findById(req.params.id);
    res.status(200).json(attribute);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ATTRIBUTE 
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let attribute;

    if (qNew) {
      attribute = await Attribute.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      attribute = await Attribute.find();
    }

    res.status(200).json(attribute);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
