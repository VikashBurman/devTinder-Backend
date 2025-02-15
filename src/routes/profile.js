const express = require("express");
const { userAuth } = require("../middlewares/auth");
const profileRouter = express.Router();
const {validateEditProfileData} = require("../utils/validation")

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  try {
    if(!validateEditProfileData(req)){
      throw new Error("Invalid Input Fields");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key)=>{
      loggedInUser[key] = req.body[key]
    })
    // console.log(loggedInUser);
    await loggedInUser.save();
    // res.send("Profile Edit Successfully");
    res.json({message:`${loggedInUser.firstName} your profile edit Successfully`,
      data:loggedInUser
    })
    // console.log(loggedInUser);
    
  } catch (error) {
    res.status(400).send("Error " + error);
  }

})



module.exports = profileRouter;
