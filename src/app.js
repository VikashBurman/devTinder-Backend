const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

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
    const user = new User(req.body);
    await user.save();
    // return res.send("User Saved Successfully");
    return res.status(201).json({ message: "User saved successfully", user });
  } catch (error) {
    return res.status(500).send("Something went Wrong");
  }
});

app.delete("/user", async(req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findByIdAndDelete({_id:userId});
    if(deletedUser){
      // console.log(deletedUser);
      return res.send("User Deleted");
    }else{
      return res.status(404).send("User not found")
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong")
  }
});

app.patch("/user",async(req,res)=>{
  const userId = req.body.userId;
  try {
    const updatedUser = await User.findByIdAndUpdate(userId,{firstName:"VVVVVVVV"});
    if(updatedUser){
      console.log(updatedUser);
      res.send("User Updated Successfully");
    }else{
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
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
