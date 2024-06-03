const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// Validation
const validateProfileInput = require("../../lib/validation/profile");

router.get("/test", (req, res) => res.json({ msg: "Profile route works" }));

// Get the profile of the current logged-in user
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id }).populate(
        "user",
      );

      if (!profile) {
        errors.noprofile = "No profile found for this user";
        return res.status(404).json(errors);
      }
      res.json(profile);
    } catch (err) {
      return res.status(404).json(err);
    }
  },
);

// Create new or update existing profile
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const profileFields = {};

    profileFields.user = req.user.id;
    profileFields.displayName = req.body.displayName;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.website) profileFields.website = req.body.website;

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    if (req.body.bands) profileFields.bands = req.body.bands.split(",");
    if (req.body.instruments)
      profileFields.instruments = req.body.instruments.split(",");

    try {
      // Update
      const profile = await Profile.findOne({ user: req.user.id });
      if (profile) {
        const updatedProfile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          {
            new: true,
            useFindAndModify: false,
          },
        );
        res.json(updatedProfile);
      } else {
        // Create

        // Check for existing display name
        const displayNameCheck = await Profile.findOne({
          displayName: profileFields.displayName,
        });
        if (displayNameCheck) {
          errors.displayName = "That display name is already in use";
          return res.status(400).json(errors);
        }

        const newProfile = await new Profile(profileFields).save();
        res.json(newProfile);
      }
    } catch (err) {
      console.log(err);
    }
  },
);

// Get a profile by user id
router.get("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const errors = {};
  try {
    const profile = await Profile.findOne({ user: userId }).populate("user", [
      "name",
      "email",
    ]);
    res.json(profile);
  } catch (err) {
    errors.noprofile = "No profile found";
    res.status(404).json(errors);
  }
});

router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Profile.findOneAndRemove({ user: req.user.id });
      await User.findOneAndRemove({ _id: req.user.id });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
    }
  },
);

module.exports = router;
