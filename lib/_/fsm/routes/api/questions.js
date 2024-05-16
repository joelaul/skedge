const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Configuration / Utils
const keys = require("../../config/keys");

// Validation
const validateCreateQuestionInput = require("../../lib/validation/createQuestion");
const validateAddAnswerInput = require("../../lib/validation/addAnswer");

// Question Model
const Question = require("../../models/Question");

// ROUTES //

// Test
router.get("/test", (req, res) => res.json({ msg: "Posts route works" }));

// Get all questions sorted by date
router.get("/", async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("user", ["name", "email"])
      .sort({ date: -1 });

    res.json(questions);
  } catch (err) {
    res.status(404);
  }
});

// Create a new question
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateCreateQuestionInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      try {
        const newQuestion = new Question({
          title: req.body.title,
          body: req.body.body,
          tags: req.body.tags,
          user: req.user.id,
        });

        const question = await newQuestion.save();
        await res.json(question);
      } catch (err) {
        res.status(404).json({
          error: "No questions found",
        });
      }
    }
  }
);

// Get a question by id
router.get("/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id).populate("user", [
      "name",
      "email",
    ]);
    res.json(question);
  } catch (err) {
    res.status(404).json({
      error: "Question not found",
    });
  }
});

// Get all questions for a particular user
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const questions = await Question.find({
      user: userId,
    }).sort({ date: -1 });

    res.json(questions);
  } catch (err) {
    res.status(404);
  }
});

// Delete a question
router.delete(
  "/:questionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let question = await Question.findById(req.params.questionId);
      if (question.user.toString() !== req.user.id) {
        return res.status(401).json({
          notAuthorized: "User not authorized",
        });
      }
      await question.remove();
      res.json({
        success: true,
      });
    } catch (err) {
      res.status(404).json({
        questionNotFound: "Question not found",
      });
    }
  }
);

// Like a question
router.post(
  "/like/:questionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let question = await Question.findById(req.params.questionId);

      if (
        question.likes.filter((like) => {
          return like.user.toString() === req.user.id;
        }).length > 0
      ) {
        return res.status(404).json({
          alreadyLiked: "You already liked this post",
        });
      }

      question.likes.unshift({
        user: req.user.id,
      });

      await question.save();
      res.json(question);
    } catch (err) {
      res.status(404).json({
        questionNotFound: "Question not found",
      });
    }
  }
);

// Answer a question
router.post(
  "/answer/:questionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateAddAnswerInput(req.body);

    if (!isValid) {
      res.status(400).json(errors);
    } else {
      try {
        let question = await Question.findById(req.params.questionId);

        question.answers.unshift({
          user: req.user.id,
          name: req.body.name,
          body: req.body.body,
        });

        await question.save();
        res.json(question);
      } catch (err) {
        res.status(404).json({
          questionNotFound: "Question not found",
        });
      }
    }
  }
);

// Delete an answer
router.delete(
  "/answer/delete/:questionId/:answerId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      let question = await Question.findById(req.params.questionId);

      // Check if answer exists
      if (
        question.answers.filter(
          (answer) => answer._id.toString() === req.params.answerId
        ).length === 0
      ) {
        res.status(404).json({
          answerNotFound: "Answer not found",
        });
      } else {
        // Get removeIndex
        const removeIndex = question.answers
          .map((answer) => answer._id.toString())
          .indexOf(req.params.answerId);

        if (
          question.answers[removeIndex].user.toString() !==
          req.user.id.toString()
        ) {
          res
            .status(400)
            .json({ notAuthorized: "Cannot delete someone else's answer" });
        } else {
          // remove from answers array
          question.answers.splice(removeIndex, 1);

          await question.save();
          res.json(question);
        }
      }
    } catch (err) {
      res.status(404).json({
        questionNotFound: "Question not found",
      });
    }
  }
);

module.exports = router;
