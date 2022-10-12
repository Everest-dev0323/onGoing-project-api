const Pagecat = require("../models/Pagecat");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newPagecat = new Pagecat(req.body);

  try {
    const savedPagecat = await newPagecat.save();
    res.status(200).json(savedPagecat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPagecat = await Pagecat.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPagecat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Pagecat.findByIdAndDelete(req.params.id);
    res.status(200).json("Page Category has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PAGE CAT
router.get("/find/:id", async (req, res) => {
  try {
    const pagecat = await Pagecat.findById(req.params.id);
    res.status(200).json(pagecat);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PAGE CAT
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let pagecat;

    if (qNew) {
      pagecat = await Pagecat.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      pagecat = await Pagecat.find();
    }

    res.status(200).json(pagecat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
