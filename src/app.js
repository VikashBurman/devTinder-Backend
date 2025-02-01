const express = require("express");
const {adminAuth} = require("./middlewares/auth")
const app = express();


// app.use("/admin",adminAuth);

app.get("/admin/getData", (req, res) => {
  res.send("All data Sent");
});

app.get("/admin/delete",adminAuth, (req, res) => {
  res.send("User Deleted");
});
app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
