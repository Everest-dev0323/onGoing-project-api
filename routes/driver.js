const Driver = require("../models/Driver");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const newDriver = new Driver(req.body);
  try {
    const savedDriver = await newDriver.save();
    return res.status(200).json(savedDriver);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(updatedDriver);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Driver.findByIdAndDelete(req.params.id);
    return res.status(200).json("Driver has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//SELECT_DELETE
router.post("/delete", async (req, res) => {
  try {
    req.body.selectArray.forEach(async(item) => {
      await Driver.findByIdAndDelete(item);
    })
    return res.status(200).json("Driver has been deleted...");
  } catch (err) {
    return res.status(500).json(err);
  }
});

//GET Driver
router.get("/find/:id", async (req, res) => {
  try {
    const driver = await Driver.findById(req.params.id);
    res.status(200).json(driver);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Driver
router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const driver = query
      ? await Driver.find().sort({ _id: -1 }).limit(5)
      : await Driver.find();
    return res.status(200).json(driver);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
