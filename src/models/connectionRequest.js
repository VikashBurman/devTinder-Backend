const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    //senderUserId login user // fromUserId
    senderUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    //to whom we are sending //toUserId
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

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;