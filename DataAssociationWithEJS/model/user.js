const mongoose = require("mongoose");

const postModel = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    data:{
        type:Date,
        default:Date.now
    },
    content:String,
    likes:[
        {type:mongoose.Schema.Types.ObjectId,ref:"User"}
    ]
});


module.exports = mongoose.model("Post",postModel)