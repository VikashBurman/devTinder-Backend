const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Virat",
    lastName: "Kohli",
    emailId: "Virat@gmail.com",
    password: "virat@123",
    age: 20,
    gender: "male",
  });

  try {
    await user.save();
    res.send("User Saved Successfully");
  } catch (error) {
    res.status(400).send("Error in saving user")
  }
});

app.get("/", (req, res) => {
  res.send("homepage");
});

connectDB()
  .then(() => {
    console.log("Connected to DB");
    app.listen(4000, () => {
      console.log("Server Started at 4000");
    });
  })
  .catch((err) => {
    console.error("Not Connected");
  });
