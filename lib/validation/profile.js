const Validator = require("validator");
const isEmpty = require("./isEmpty");

const validateProfileInput = (reqBody) => {
  let errors = {};

  reqBody.displayName = !isEmpty(reqBody.displayName)
    ? reqBody.displayName
    : "";

  if (!Validator.isLength(reqBody.displayName, { min: 2, max: 40 })) {
    errors.displayName = "Display name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(reqBody.displayName)) {
    errors.displayName = "A display name is required";
  }

  if (!isEmpty(reqBody.website)) {
    if (!Validator.isURL(reqBody.website)) {
      errors.website = "Website must be a valid URL";
    }
  }

  if (!isEmpty(reqBody.youtube)) {
    if (!Validator.isURL(reqBody.youtube)) {
      errors.youtube = "Must be a valid URL";
    }
  }

  if (!isEmpty(reqBody.twitter)) {
    if (!Validator.isURL(reqBody.twitter)) {
      errors.twitter = "Must be a valid URL";
    }
  }

  if (!isEmpty(reqBody.facebook)) {
    if (!Validator.isURL(reqBody.facebook)) {
      errors.facebook = "Must be a valid URL";
    }
  }

  if (!isEmpty(reqBody.linkedin)) {
    if (!Validator.isURL(reqBody.linkedin)) {
      errors.linkedin = "Must be a valid URL";
    }
  }

  if (!isEmpty(reqBody.instagram)) {
    if (!Validator.isURL(reqBody.instagram)) {
      errors.instagram = "Must be a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports = validateProfileInput;
