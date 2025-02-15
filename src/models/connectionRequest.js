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

connectionRequestSchema.index({senderUserId:1,receiverUserId:1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.senderUserId.equals(connectionRequest.receiverUserId)){
        throw new Error("cannot send request to yourself");
    }
    next();
})

const ConnectionRequestModel = new mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequestModel;