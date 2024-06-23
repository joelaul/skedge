const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Validation
const validateRegisterInput = require("../lib/validation/register");
const validateLoginInput = require("../lib/validation/login");

// Model
const User = require("../models/User");

// ROUTES

// Test
router.get("/test", (req, res) => {
  res.json({ message: "Users route works" });
});

// Register
router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check if client input is valid; if not, send errors to client
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    // Check if user already exists
    const user = await User.findOne({ name: req.body.name });
    if (user) {
      errors.name = "User already exists";
      return res.status(400).json(errors);
    }

    // Encrypt user data and save to db
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);
    const savedUser = await newUser.save();

    // Send new user data to client
    res.json(savedUser);
  } catch (err) {
    // Handle server-side error
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check if client input is valid; if not, send errors to client
  if (!isValid) {
    res.status(400).json(errors);
  } else {
    // Check if user exists
    const name = req.body.name;
    const password = req.body.password;
    let user = await User.findOne({ name });

    if (user) {
      // Check if password is correct; if so, generate JWT and send to client
      let isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
        };
        const secret = process.env.SECRET;
        let token = jwt.sign(payload, secret);

        res.json({
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
  "/me",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  },
);

module.exports = router;
