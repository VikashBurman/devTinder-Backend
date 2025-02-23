const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const authRouter = express.Router();
const { validationSignupData } = require("../utils/validation");

authRouter.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validationSignupData(req);
    const { firstName, lastName, password, emailId,photoUrl,skills,about,age,gender } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      photoUrl,
      skills,
      about,
      age,
      gender,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Saved!!", user });
  } catch (error) {
    return res.status(400).send("Error in Saving user " + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.send("Enter Required Field");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      // console.log(token);
      res.cookie("token", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
      });
      return res.send(user);
    } else {
      return res.status(400).send("password not valid");
    }
  } catch (error) {
    return res.status(400).send("Error in login" + error);
  }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    });
    res.status(200).json({ message: "Logout Successful!" });
    
})

module.exports = authRouter;
