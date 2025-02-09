const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  console.log(email);
  try {
    const users = await User.findById("67a2484b89330a16dd6f89fe");
    if (!users) {
      res.send("user not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Someting went wrong");
  }
});

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  try {
    // validationSignupData(req);
    const { firstName, lastName, password, emailId } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });
    await user.save();
    res.status(201).json({ message: "User Saved!!", user });
  } catch (error) {
    return res.status(400).send("Error in Saving user " + error);
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  const { token } = cookies;
  const decodedMsg = jwt.verify(token, "myPrivateKey");
  // console.log(decodedMsg);
  const { _id } = decodedMsg;
  const loginUser = await User.findById(_id);
  console.log(loginUser);

  res.send("Reading cookie");
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.send("Enter Required Field");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "myPrivateKey");
      // console.log(token);
      res.cookie("token", token);
      return res.send("Login successfully!!");
    } else {
      return res.status(400).send("password not valid");
    }
  } catch (error) {
    return res.status(400).send("Error in login" + error);
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete({ _id: userId });
    if (deletedUser) {
      // console.log(deletedUser);
      return res.send("User Deleted");
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const data = req.body;
  const userId = req.body.userId;
  // if(data.emailId){
  //   return res.status(400).send("update email is not allowed");
  // }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, data);
    if (updatedUser) {
      // console.log(updatedUser);
      res.send("User Updated Successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
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
