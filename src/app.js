const express = require('express');

const app = express();   
app.use("/test",(req,res)=>{
    res.send("Hello from test")
})

app.use("/",(req,res)=>{
    res.send("Hello from homepage")
})


    
app.listen(5000,()=>{
    console.log("Server Listening at Port 5000");
})
