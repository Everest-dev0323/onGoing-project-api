const Testimonial = require("../models/Testimonial");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newTestimonial = new Testimonial(req.body);

  try {
    const savedTestimonial = await newTestimonial.save();
    res.status(200).json(savedTestimonial);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedTestimonial);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json("Testimonial has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET testimonial
router.get("/find/:id", async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL testimonial
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let testimonial;

    if (qNew) {
      testimonial = await Testimonial.find().sort({ createdAt: -1 }).limit(1);
    }/*else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    }*/ else {
      testimonial = await Testimonial.find();
    }

    res.status(200).json(testimonial);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
