const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if(!token){
      throw new Error("Invalid token")
    }

    const decodedMsg = jwt.verify(token, "myPrivateKey");
    const { _id } = decodedMsg;
    const loginUser = await User.findById(_id);
    if (!loginUser) {
      throw new Error("User not found");
    }
    req.user = loginUser;
    // console.log(loginUser);
    next();
  } catch (error) {
    res.status(400).send("Error " + error);
  }
};
module.exports = {
  userAuth,
};
