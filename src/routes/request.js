const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  async(req, res) => {
    try {
      const status = req.params.status;
      const receiverUserId = req.params.receiverUserId;
      const senderUserId = req.user._id;

      const connectionRequest = new ConnectionRequestModel({
        senderUserId,
        receiverUserId,
        status
      });
      const data = await connectionRequest.save();

      res.json({message:"Request Sent Successfully",data});
    } catch (error) {
      res.status(400).send("Error: "+error)
    }
  }
);

module.exports = requestRouter;
