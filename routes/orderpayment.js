const Orderpayment = require("../models/Orderpayment");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrderpayment = new Orderpayment(req.body);

  try {
    const savedOrderpayment = await newOrderpayment.save();
    res.status(200).json(savedOrderpayment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedOrderpayment = await Orderpayment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrderpayment);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Orderpayment.findByIdAndDelete(req.params.id);
    res.status(200).json("Orderpayment has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Orderpayment
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orderpayment = await Orderpayment.findOne({ userId: req.params.userId });
    res.status(200).json(orderpayment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orderpayments = await Orderpayment.find();
    res.status(200).json(orderpayments);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
