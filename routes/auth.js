const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
let referralCodeGenerator = require('referral-code-generator')


//REGISTER
router.post("/register", async (req, res, next) => {
  if(req.body._id && req.body.email) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.body._id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
  refer_code = referralCodeGenerator.custom('lowercase', 4, 4, req.body.username);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    refer_code: refer_code,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    const accessToken = jwt.sign(
      {
          id: savedUser._id,
          isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
          {expiresIn:"3d"}
      );
      // return res.status(201).json(savedUser);

    //  const { password, ...others } = user._doc;  
      res.status(200).json({accessToken});
  } catch (err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while registering the User."
    });
  }
});

//LOGIN

router.post('/login', async (req, res, next) => {
    try{
        const user = await User.findOne(
            {
                email: req.body.email
            }
        );
        if(!user) return res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        if (originalPassword != inputPassword) {
            return res.status(401).json("Wrong Password");
        }

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"5d"}
        );
  
        const { password, ...others } = user._doc;  
        return res.status(200).json({...others, accessToken});

    }catch(err){
        return res.status(500).json(err);
    }

});

module.exports = router;
