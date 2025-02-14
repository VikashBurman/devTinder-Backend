const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    //senderUserId login user
    senderUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    //to whom we are sending
    receiverUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is not correct status type`
        }
    }
},{
    timestamps:true
});

const ConnectionRequestModel = new mongoose.Model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;