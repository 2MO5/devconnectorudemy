const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

//@route   GET api/auth
//#desc    Test  route
//@acess   Public

router.get("/", auth, async (req, res) => {
  try {
    const user = await await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Damn it! There is a Server Error");
  }
});

//@route   POST api/auth
//#desc    Authenticate user & get token
//@acess   Public

router.post(
  "/",
  [
    check("email", "Include a valid email or get the hell out").isEmail(),
    check("password", "Dude! password is a MUST!").isLength({ min: 6 })
  ],
  async (req, res) => {
    //handling the respsonse
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // see if user exists
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials; wrong password yo!" }]
        });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 }, //only for dev
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Sevrer error");
    }
  }
);

module.exports = router;
