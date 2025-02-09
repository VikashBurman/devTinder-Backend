const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

const app = express();
app.use(express.json());
app.use(cookieParser());


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

app.get("/profile", userAuth, async (req, res) => {
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

    const isPasswordValid = await user.validatePassword(password)
    if (isPasswordValid) {
      const token = await user.getJWT();
      // console.log(token);
      res.cookie("token", token,{ expires: new Date(Date.now() + 900000), httpOnly: true });
      return res.send("Login successfully!!");
    } else {
      return res.status(400).send("password not valid");
    }
  } catch (error) {
    return res.status(400).send("Error in login" + error);
  }
});

app.post("/sendConnectionReq",userAuth,(req,res)=>{
  const user = req.user;
  res.send(user.firstName+" Send Connection Request");
})

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
