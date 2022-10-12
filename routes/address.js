const Address = require("../models/Address");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newAddress = new Address(req.body);

  try {
    const savedAddress = await newAddress.save();
    res.status(200).json(savedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedAddress = await Address.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedAddress);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).json("Address has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ADDRESS
router.get("/find/:id", async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.get("/user/:user_id", async (req, res) => {
  try {
    const address = await Address.find({user_id:req.params.user_id});
    //console.log(req.params.slug);
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});


//GET ALL ADDRESS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let address;

    if (qNew) {
      address = await Address.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      address = await Address.find();
    }

    res.status(200).json(address);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
