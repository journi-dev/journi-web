const isEmail = (string) => {
  const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return Boolean(string.toLowerCase().match(emailRegEx));
};

const isEmpty = (string) => {
  return string.trim() === "";
};

const validateErrors = (object) => {
  let isValid = true;
  Object.keys(object).forEach((key) => {
    if (object[key] !== "") isValid = false;
  });
  return isValid;
};

exports.validateLoginData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email required";
  else if (!isEmail(data.email)) errors.email = "Please enter a valid email.";
  else errors.email = "";

  if (isEmpty(data.password)) errors.password = "Password required";
  else errors.password = "";

  return {
    errors,
    valid: validateErrors(errors),
  };
};

exports.validateSignUpData = (data) => {
  let errors = {};

  if (isEmpty(data.email)) errors.email = "Email required";
  else if (!isEmail(data.email)) errors.email = "Please enter a valid email.";

  if (isEmpty(data.password)) errors.password = "Password required";
  if (data.password !== data.confirmPassword)
    errors.confirmPassword = "Passwords must match";
  if (isEmpty(data.username)) errors.username = "Username required";

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
