const express = require("express");
const path = require("path");
const app = express();

const postModel = require("./models/post");
const userModel = require("./models/user");

app.get("/", (req, res) => {
    res.send("hey");
});
app.get("/create", async (req, res) => {
    try {
        const user = await userModel.create({
            username: "kunal",
            email: "kunal@example.com",
            age: 17,
        });
        res.send(user);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send("Error creating user");
    }
});

app.get("/post/create", async (req, res) => {
    try {
        let post = await postModel.create({
            postdata: "hello data aa gaya",
            user: "664193e7e6375229083aa8f2"
        });
        let user = await userModel.findOne({ _id: "664193e7e6375229083aa8f2" });
        user.posts.push(user._id);
        await user.save();//JAB HUM HAAT SE KOI CHANGES KARTE HE DATABASE ME TO HAME .SAVE() KA USE LENA PADTA HE KYOKI HUM UPDATE METHOD KA USE NAHI KRR RAHE HE

        res.send({ post, user });
    }catch(err){
        console.error("Error showing user:", err);
        res.status(501).send("Error showing error");
    }
})


app.listen(3000, () => {
    console.log("SERVER STARTED")
});

