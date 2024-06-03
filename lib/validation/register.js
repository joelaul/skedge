const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateRegisterInput = (reqBody) => {
  let errors = {};

  reqBody.name = !isEmpty(reqBody.name) ? reqBody.name : "";
  reqBody.email = !isEmpty(reqBody.email) ? reqBody.email : "";
  reqBody.password = !isEmpty(reqBody.password) ? reqBody.password : "";

  if (!Validator.isLength(reqBody.name, { min: 2, max: 20 })) {
    errors.name = "Username must be between 2 and 20 characters";
  }

  if (!Validator.isAlpha(reqBody.name)) {
    errors.name = "Username may only contain letters";
  }

  if (Validator.isEmpty(reqBody.name)) {
    errors.name = "Username field is required";
  }

  if (!Validator.isEmail(reqBody.email)) {
    errors.email = "Email address must be in correct format";
  }

  if (Validator.isEmpty(reqBody.email)) {
    errors.email = "Email field is required";
  }

  if (!Validator.isLength(reqBody.password, { min: 10, max: 50 })) {
    errors.password = "Password must be between 10 and 50 characters";
  }

  if (Validator.isEmpty(reqBody.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateRegisterInput;
