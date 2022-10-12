const Role = require("../models/Role");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newRole = new Role(req.body);

  try {
    const savedRole = await newRole.save();
    res.status(200).json(savedRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedRole = await Role.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedRole);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.status(200).json("Role has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ROLE
router.get("/find/:id", async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);
    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL ROLE
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let role;

    if (qNew) {
      role = await Role.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      role = await Role.find();
    }

    res.status(200).json(role);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
