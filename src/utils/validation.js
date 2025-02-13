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

const validateEditProfileData = (req)=>{
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills"
  ];
  return Object.keys(req.body).every((field) => allowedEditFields.includes(field));
}

module.exports = { validationSignupData,validateEditProfileData };
