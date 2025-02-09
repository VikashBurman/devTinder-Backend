const validator = require("validator");

const validationSignupData = (req) => {
  const { email, firstName, lastName, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Enter valid name");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter Strong password");
  } else if (!validator.isEmail(email)) {
    throw new Error("Enter valid email id");
  }
};

module.exports = { validationSignupData };
