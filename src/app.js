const express = require('express');
require("./config/database")

const app = express();

app.get('/',(req,res)=>{
  res.send("homepage");
})

app.listen(4000,()=>{
  console.log("Server Started");
})

