const Contactus = require("../models/Contactus");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newContactus = new Contactus(req.body);

  try {
    const savedContactus = await newContactus.save();
    res.status(200).json(savedContactus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedContactus = await Contactus.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedContactus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Contactus.findByIdAndDelete(req.params.id);
    res.status(200).json("Contactus has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Contact us
router.get("/find/:id", async (req, res) => {
  try {
    const contactus = await Contactus.findById(req.params.id);
    res.status(200).json(contactus);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Enquiry
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let contactus;

    if (qNew) {
      contactus = await Contactus.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      contactus = await Contactus.find({
        contactus: {
          $in: [qCategory],
        },
      });
    } else {
      contactus = await Contactus.find();
    }

    res.status(200).json(contactus);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
