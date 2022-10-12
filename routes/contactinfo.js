const Contactinfo = require("../models/Contactinfo");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newContactinfo = new Contactinfo(req.body);

  try {
    const savedContactinfo = await newContactinfo.save();
    res.status(200).json(savedContactinfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedContactinfo = await Contactinfo.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedContactinfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Contactinfo.findByIdAndDelete(req.params.id);
    res.status(200).json("Contact info has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Contact info
router.get("/find/:id", async (req, res) => {
  try {
    const contactinfo = await Contactinfo.findById(req.params.id);
    res.status(200).json(contactinfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Enquiry
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let contactinfo;

    if (qNew) {
      contactinfo = await Contactinfo.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      contactinfo = await Contactinfo.find({
        contactinfo: {
          $in: [qCategory],
        },
      });
    } else {
      contactinfo = await Contactinfo.find();
    }

    res.status(200).json(contactinfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
