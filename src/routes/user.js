const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const userRouter = express.Router();

userRouter.get("/user/request/received",userAuth,async(req,res)=>{    
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequestModel.find({
            receiverUserId:loggedInUser._id,
            status:"interested"
        }).populate("senderUserId",["firstName","lastName","age","gender","skills","photoUrl","about"]);

        if(!connectionRequests){
           return res.json({message:"no connection request found"});
        }
        res.json({message:"Connection Request Found",
            data:connectionRequests
        })
    } catch (error) {
        res.status(400).send("Error: ",error.message)
    }
})

module.exports = userRouter;