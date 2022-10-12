const Vendor = require("../models/Vendor");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newVendor = new Vendor(req.body);
  try {
    const savedVendor = await newVendor.save();
    return res.status(200).json(savedVendor);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedVendor);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    return res.status(200).json("Vendor has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Vendor.findByIdAndDelete(item);
    })
    return res.status(200).json("Vendor has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Vendor
router.get("/find/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Vendor
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const vendor = query
      ? await Vendor.find().sort({ _id: -1 }).limit(5)
      : await Vendor.find();
    return res.status(200).json(vendor);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
