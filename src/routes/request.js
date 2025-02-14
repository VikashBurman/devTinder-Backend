const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const receiverUserId = req.params.receiverUserId;
      const senderUserId = req.user._id;

      const allowedMethod = ["interested", "ignored"];
      if (!allowedMethod.includes(status)) {
        return res.status(400).json({ message: "Invalid action " + status });
      }

      const existingConnectionReq = await ConnectionRequestModel.findOne({
        $or: [
          //sender send request to reciever but sender cant send again
          { senderUserId,receiverUserId },
          //opposite once sender send request receiver cant send same
          { senderUserId: receiverUserId, receiverUserId: senderUserId },
        ],
      });

      if(existingConnectionReq){
        return res.status(400).json({message:"Connection Request Already Exist!!"});
      }

      const connectionRequest = new ConnectionRequestModel({
        senderUserId,
        receiverUserId,
        status,
      });
      const data = await connectionRequest.save();

      res.json({ message: "Request Sent Successfully", data });
    } catch (error) {
      res.status(400).send("Error: " + error);
    }
  }
);

module.exports = requestRouter;
