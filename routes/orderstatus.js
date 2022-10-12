const Orderstatus = require("../models/Orderstatus");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newOrderstatus = new Orderstatus(req.body);

  try {
    const savedOrderstatus = await newOrderstatus.save();
    res.status(200).json(savedOrderstatus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrderstatus = await Orderstatus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrderstatus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Orderstatus.findByIdAndDelete(req.params.id);
    res.status(200).json("Orderstatus has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Order status
router.get("/find/:id", async (req, res) => {
  try {
    const orderstatus = await Orderstatus.findById(req.params.id);
    res.status(200).json(orderstatus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ORDER status
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let orderstatus;

    if (qNew) {
      orderstatus = await Orderstatus.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      orderstatus = await Orderstatus.find();
    }

    res.status(200).json(orderstatus);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
