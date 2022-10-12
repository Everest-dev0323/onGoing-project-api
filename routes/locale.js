const Locale = require("../models/Locale");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newLocale = new Locale(req.body);

  try {
    const savedLocale = await newLocale.save();
    res.status(200).json(savedLocale);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedLocale = await Locale.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedLocale);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Locale.findByIdAndDelete(req.params.id);
    res.status(200).json("Locale has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET LOCALE
router.get("/find/:id", async (req, res) => {
  try {
    const locale = await Locale.findById(req.params.id);
    res.status(200).json(locale);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ADDRESS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let locale;

    if (qNew) {
      locale = await Locale.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      locale = await Locale.find();
    }

    res.status(200).json(locale);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
