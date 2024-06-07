const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const { error } = require("console");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.set("view engine","ejs");


app.get("/",function(req,res){
    res.render('index');
});

app.post("/create", async function(req,res){
    const {name,email,password,age} = req.body;

   let hashpassowrd = await bcrypt.hash(password,10);
   console.log(hashpassowrd);



    let createUser = await userModel.create({
        name,
        email,
        password:hashpassowrd,
        age
    });
    let token = jwt.sign({email},"thenameiskunal");
    res.cookie("token",token);
    res.redirect("/");
    console.log(createUser)
});

app.get("/login",function(req,res){
    res.render("logout");
})

app.post("/login",async function(req,res){
    let findUser = await userModel.findOne({email:req.body.email});
    console.log(findUser)
    if(!findUser){
        res.send("user not found")
    }
    else{
        let ComparePass = bcrypt.compare(req.body.password,findUser.password,function(err,result){
            if(result){
                let token = jwt.sign({email},"thenameiskunal");
                res.cookie("token",token);
                res.send("login successful");
            }
            else{
                res.send("Credentials not valid")
            }
        })
    }
})




app.listen(3000,(e)=>{
    if(e){
        console.log("Internal server error");
    }
    else{
        console.log("server started")
    }

})