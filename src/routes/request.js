const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

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

      const isValidUser = await User.findById(receiverUserId);
      if (!isValidUser) {
        res.status(400).json({ message: "User not found!!" });
      }

      const existingConnectionReq = await ConnectionRequestModel.findOne({
        $or: [
          //sender send request to reciever but sender cant send again
          { senderUserId, receiverUserId },
          //opposite once sender send request receiver cant send same
          { senderUserId: receiverUserId, receiverUserId: senderUserId },
        ],
      });

      if (existingConnectionReq) {
        return res
          .status(400)
          .json({ message: "Connection Request Already Exist!!" });
      }

      const connectionRequest = new ConnectionRequestModel({
        senderUserId,
        receiverUserId,
        status,
      });
      const data = await connectionRequest.save();
      // console.log(receiverUserId);

      res.json({
        message:
          req.user.firstName +
          " sent " +
          status +
          " request to " +
          isValidUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req, res) => {
    try {
      const status = req.params.status;
      const requestId = req.params.requestId;
      
      const allowedMethod = ["accepted", "rejected"];
      if (!allowedMethod.includes(status)) {
        return res.status(404).json({ message: "Invalid status !!" });
      }
      const loggedInUser = req.user;
      const connectionRequest = await ConnectionRequestModel.findOne({
        receiverUserId: loggedInUser,
        _id: requestId,
        status: "interested",
      });
      if (!connectionRequest) {
        return res.status(400).json({ message: "Connection request not found" });
      }

      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: "Request " + status, data });
    } catch (error) {
      res.status(400).send("Error: " + error.message);
    }
  }
);

module.exports = requestRouter;
