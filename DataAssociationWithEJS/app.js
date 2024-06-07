const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const userModel = require("./model/model"); // Correct model path
const postModel = require("./model/user"); // Correct model path
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const mongoose = require('mongoose');
const upload = require("./config/multer");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/locked", isLoggedin, async (req, res) => {
    try {
        let Findusr = await userModel.findOne({ email: req.user.email }).populate("post").exec();
        res.render("locked", { user: Findusr });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving user data");
    }
});

app.post("/registration", async (req, res) => {
    try {
        console.log(req.body);
        let { name, email, password } = req.body;
        const hashpassword = await bcrypt.hash(password, 10);
        let user = await userModel.create({
            name,
            email,
            password: hashpassword
        });

        let token = jwt.sign({ email: email, userid: user._id }, "thenameiskunal022");
        res.cookie("token", token);
        console.log(user);
        res.redirect("/locked");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
});

app.get("/logout", (req, res) => {
    res.cookie("token", "");
    res.redirect("/login");
});

app.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let finduser = await userModel.findOne({ email });

        if (!finduser) {
            res.send("user not found");
        } else {
            const hashed = await bcrypt.compare(password, finduser.password);
            if (hashed) {
                let token = jwt.sign({ email: email, userid: finduser._id }, "thenameiskunal022");
                res.cookie("token", token);
                res.redirect("/locked");
            } else {
                res.send("invalid credentials");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in user");
    }
});

app.post("/post", isLoggedin, async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.user.email });
        const { content } = req.body;

        let postdata = await postModel.create({
            user: user._id,
            content: content
        });

        user.post.push(postdata._id);
        await user.save();
        res.redirect("/locked");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post");
    }
});

app.get("/like/:id", isLoggedin, async (req, res) => {
    try {
        let post = await postModel.findById(req.params.id);
        if (!post) {
            console.log("Post not found");
            return res.status(404).send("Post not found");
        }

        let userId = new mongoose.Types.ObjectId(req.user.userid);
        let index = post.likes.indexOf(userId.toString());

        console.log(`User ID: ${userId}`);
        console.log(`Post Likes Before: ${post.likes}`);

        if (index === -1) {
            post.likes.push(userId);
            console.log("Liked the post");
        } else {
            post.likes.splice(index, 1);
            console.log("Unliked the post");
        }

        await post.save();

        console.log(`Post Likes After: ${post.likes}`);
        res.redirect("/locked");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error liking/unliking post");
    }
});

app.get("/edit/:id", isLoggedin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid post ID");
        }

        let usr = await postModel.findOne({ _id: req.params.id }).populate('user');
        res.render("edit", { usr: usr });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving post data");
    }
});

app.post("/edit/:id", isLoggedin, async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).send("Invalid post ID");
        }

        await postModel.findOneAndUpdate({ _id: req.params.id }, { content: req.body.contentEdit });
        res.redirect("/locked");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error in update");
    }
});

app.get("/test", isLoggedin, (req, res) => {
    res.render("testMulter");
});

app.post("/upload", isLoggedin, upload.single("image"), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.profilePic = req.file.filename;
    await user.save();
    res.redirect("/locked");
});

function isLoggedin(req, res, next) {
    if (!req.cookies.token) {
        return res.send("You must be logged in");
    } else {
        try {
            let data = jwt.verify(req.cookies.token, "thenameiskunal022");
            req.user = data;
            console.log(req.user);
            next();
        } catch (error) {
            return res.send("Invalid token");
        }
    }
}

app.listen(3000, () => {
    console.log("SERVER STARTED");
});
