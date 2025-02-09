const mongoose = require('mongoose');
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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

userSchema.methods.getJWT = function(){
    const user = this;
    const token = jwt.sign({ _id: user._id }, "myPrivateKey",{ expiresIn: '7d' });
    return token;
}

userSchema.methods.validatePassword = function(inputPassword){
    const user = this;
    const hashPassword = user.password;

    const isValid = bcrypt.compare(inputPassword, hashPassword);
    return isValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;