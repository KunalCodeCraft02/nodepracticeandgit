const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/dataoftest").then((e)=>console.log("Database Connected"))


const userSchema = mongoose.Schema({
    name:String,
    email:String,
    image:String
});

module.exports = mongoose.model('usertest',userSchema);