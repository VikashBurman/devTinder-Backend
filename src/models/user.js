const mongoose = require('mongoose');
const validator = require("validator")

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        unique:true,
        minLength:4
    },
    lastName:{
        type:String,
        default:"Default Lastname"
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Enter valid email id")
            }
        }
    },
    password:{
        type:String,
        required:true   
    },
    age:{
        type:Number,
        min:18
    },
    gender:{
        type:String,
        validate(value){
            if(!["male","female","other"].includes(value)){
                throw new Error("Gender value is not valid")
            }
        }
    },
},{
    timestamps:true
});

const User = mongoose.model("User",userSchema);
module.exports = User;