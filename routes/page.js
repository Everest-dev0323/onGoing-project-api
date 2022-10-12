const Page = require("../models/Page");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newPage = new Page(req.body);

  try {
    const savedPage = await newPage.save();
    res.status(200).json(savedPage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedPage);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Page.findByIdAndDelete(req.params.id);
    res.status(200).json("Page  has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PAGE 
router.get("/find/:id", async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    res.status(200).json(page);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PAGE 
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let page;

    if (qNew) {
      page = await Page.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      page = await Page.find();
    }

    res.status(200).json(page);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
