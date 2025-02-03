const express = require("express");
const connectDB = require("./config/database");

const app = express();

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





  