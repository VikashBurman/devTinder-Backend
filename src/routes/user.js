const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

const userRouter = express.Router();
const User_Safe_Data = [
  "firstName",
  "lastName",
  "age",
  "gender",
  "skills",
  "photoUrl",
  "about",
];
userRouter.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      receiverUserId: loggedInUser._id,
      status: "interested",
    }).populate("senderUserId", User_Safe_Data);
    // console.log(connectionRequests);
    

    if (!connectionRequests) {
      return res.json({ message: "no connection request found" });
    }
    res.json({ message: "Connection Request Found", data: connectionRequests });
  } catch (error) {
    res.status(400).send("Error: ", error.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { receiverUserId: loggedInUser._id, status: "accepted" },
        { senderUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("senderUserId", User_Safe_Data)
      .populate("receiverUserId", User_Safe_Data);

    if (!connectionRequests) {
      return res.json({ message: "no connection request found" });
    }
    const data = connectionRequests.map((row) => {
      if (row.senderUserId._id.toString() === loggedInUser._id.toString()) {
        return row.receiverUserId;
      }
      return row.senderUserId;
    });
    res.json({
      message: "Connection request fetched",
      data,
    });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequestModel.find({
      $or: [
        { senderUserId: loggedInUser._id },
        { receiverUserId: loggedInUser._id },
      ],
    });
    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.senderUserId.toString());
      hideUsersFromFeed.add(req.receiverUserId.toString());
    });
    // console.log(hideUsersFromFeed);
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(User_Safe_Data)
      .skip(skip)
      .limit(limit);

    res.send({ message: "User feed fetched Successfully", users });
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});
module.exports = userRouter;
