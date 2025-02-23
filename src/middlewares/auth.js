const jwt = require("jsonwebtoken");
const User = require("../models/user");


const userAuth = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    // console.log(token);
    
    if(!token){
      // return res.status(401).json({message:"Unauthorized User"})
      return res.status(401).send("Unauthorized User");
    }
    const decodedMsg = jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decodedMsg;
    const loginUser = await User.findById(_id);
    if (!loginUser) {
      throw new Error("User not found");
    }
    req.user = loginUser;
    next();
  } catch (error) {
    res.status(400).send("Error " + error);
  }
};
module.exports = {
  userAuth,
};
