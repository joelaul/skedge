const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateAddAnswerInput = (reqBody) => {
  let errors = {};

  reqBody.body = !isEmpty(reqBody.body) ? reqBody.body : "";

  if (!Validator.isLength(reqBody.body, { min: 10, max: 10000 })) {
    errors.body = "Response must be between 10 and 10000 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateAddAnswerInput;
