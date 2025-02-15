const express = require("express");
const connectDB = require("./config/database");
const cookie = require("cookie");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser());
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);

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
