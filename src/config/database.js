const mongoose = require('mongoose');

const connectDB = async() =>{
   await mongoose.connect("mongodb+srv://vikasburman131:MggjtnxopL00xlBv@cluster0.nff0d.mongodb.net/")
}

connectDB().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.error("Not Connected");
})

