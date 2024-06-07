const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1/loginSystem")
.then((e)=>{console.log("DATABASE CONNECTED")});

// userModel (model/user.js)
// const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePic:{
        type:String,
        default:"defualt.png"
    },
    post: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('User', userSchema);


