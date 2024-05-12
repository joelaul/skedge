const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// Model
const User = require("../models/User");

// Validation
const validateRegisterInput = require("../lib/validation/register");

/*
    const passport = require("passport");
    const jwt = require("jsonwebtoken");
    const keys = require("../../config/keys");
    const validateLoginInput = require("../lib/validation/login");
*/

// ROUTES

// Test
router.get("/test", (req, res) => {
  res.json({ message: "Users route works" });
});

// Register new user
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (isValid) {
    res.status(400).json(errors);
  } else {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      errors.email = "Email already exists";``
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      try {
        let salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);

        let user = await newUser.save();
        res.json(user);
      } catch (err) {
        console.log("Caught error: ", err);
      }
    }
  }
});

/* 
  // Login existing user
  router.post("/login", async (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      const email = req.body.email;
      const password = req.body.password;

      let user = await User.findOne({ email });

      if (user) {
        let isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };
          const secret = keys.secret;

          let token = await jwt.sign(payload, secret);

          await res.json({
            success: true,
            token: `Bearer ${token}`,
          });
        } else {
          errors.password = "Password is incorrect";
          res.status(400).json(errors);
        }
      } else {
        errors.email = "User not found";
        res.status(400).json(errors);
      }
    }
  });

  // Check current user based on JWT
  router.get(
    "/current",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
      res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
      });
    }
  ); 
*/

module.exports = router;