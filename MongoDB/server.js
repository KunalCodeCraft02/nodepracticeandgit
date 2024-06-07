// server.js
const express = require("express");
const app = express();
const path = require("path")
const fs = require("fs");
const User = require("./models/user")

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", function (req, res) {
    res.render("index");
});

app.get("/read", async function (req, res) {
    const allUser = await User.find();
    res.render("read", { user1: allUser });
});

app.post("/create", async function (req, res) {
    const { name, email, image } = req.body;
    const createdUser = await User.create({
        name,
        email,
        image
    });
    res.redirect("/read");
});

app.get("/delete/:_id", async function (req, res) {
    let userDelete = await User.findOneAndDelete({ _id: req.params._id });
    const allUser = await User.find(); // Fetch all users again
    res.render("read", { user1: allUser }); // Pass all users to the template
});

app.get("/edit/:userid", async function (req, res) {
    let usr = await User.findOne({ _id: req.params.userid });
    res.render("edit", { usr: usr });
});

app.post("/update/:userid", async function (req, res) {
    let { updatename, updateemail, updateimage } = req.body;
    let updateUser = await User.findOneAndUpdate({ _id: req.params.userid }, { name: updatename, email: updateemail, image: updateimage }, { new: true });
    res.redirect("/read");
});

app.listen(3000, () => {
    console.log("SERVER RUNNING");
});
