const Help = require("../models/Help");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newHelp = new Help(req.body);

  try {
    const savedHelp = await newHelp.save();
    res.status(200).json(savedHelp);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedHelp = await Help.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedHelp);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Help.findByIdAndDelete(req.params.id);
    res.status(200).json("Help has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET HELP
router.get("/find/:id", async (req, res) => {
  try {
    const help = await Help.findById(req.params.id);
    res.status(200).json(help);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL HELP
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let help;

    if (qNew) {
      help = await Help.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      help = await Help.find();
    }

    res.status(200).json(help);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
