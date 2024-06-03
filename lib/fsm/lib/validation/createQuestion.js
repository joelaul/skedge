const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateCreateQuestionInput = (reqBody) => {
  let errors = {};

  reqBody.title = !isEmpty(reqBody.title) ? reqBody.title : "";
  reqBody.body = !isEmpty(reqBody.body) ? reqBody.body : "";

  if (!Validator.isLength(reqBody.title, { min: 10, max: 100 })) {
    errors.title = "Title field must be between 10 and 100 characters";
  }

  if (Validator.isEmpty(reqBody.title)) {
    errors.title = "Title field is required";
  }

  if (!Validator.isLength(reqBody.body, { min: 50, max: 10000 })) {
    errors.body = "You need to add more detail";
  }

  if (Validator.isEmpty(reqBody.body)) {
    errors.body = "Body field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateCreateQuestionInput;
