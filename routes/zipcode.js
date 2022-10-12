const Zipcode = require("../models/Zipcode");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newZipcode = new Zipcode(req.body);
  try {
    const savedZipcode = await newZipcode.save();
    return res.status(200).json(savedZipcode);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedZipcode = await Zipcode.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedZipcode);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Zipcode.findByIdAndDelete(req.params.id);
    return res.status(200).json("Zipcode has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Zipcode.findByIdAndDelete(item);
    })
    return res.status(200).json("Zipcode has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Vendor
router.get("/find/:id", async (req, res) => {
  try {
    const zipcode = await Zipcode.findById(req.params.id);
    res.status(200).json(zipcode);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Zipcode
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const zipcode = query
      ? await Zipcode.find().sort({ _id: -1 }).limit(5)
      : await Zipcode.find();
    return res.status(200).json(zipcode);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
