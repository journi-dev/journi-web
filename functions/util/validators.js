const isEmail = (string) => {
  const emailRegEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return string.match(emailRegEx);
};

const isEmpty = (string) => {
  return string.trim() === "";
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "This cannot not be empty.";
  if (isEmpty(data.password)) errors.password = "This cannot not be empty.";

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "This cannot not be empty.";
  else if (!isEmail(data.email))
    errors.email = "Must be a valid email address.";

  if (isEmpty(data.password)) errors.password = "This cannot not be empty.";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match.";
  if (isEmpty(data.username)) errors.username = "This cannot not be empty.";

  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

exports.reduceUserDetails = (data) => {
  let userDetails = {};

  if (!isEmpty(data.jobTitle.trim())) userDetails.jobTitle = data.jobTitle;
  if (!isEmpty(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http")
      userDetails.website = `http://${data.website.trim()}`;
    else userDetails.website = data.website;
  }

  return userDetails;
};
