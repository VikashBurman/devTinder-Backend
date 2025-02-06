const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:4
    },
    lastName:{
        type:String,
        default:"lalalal"
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String
    },
    age:{
        type:Number,
        min:15
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