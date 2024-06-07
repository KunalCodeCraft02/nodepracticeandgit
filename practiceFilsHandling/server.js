const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');


app.get('/',function(req,res){
    fs.readdir(`./files`,function(err,files){
        res.render("index",{files:files});
    });
});

app.post("/create",function(req,res){
    fs.writeFile(`./files/${req.body.FileName.split(" ").join('')}.txt`,req.body.textArea,function(err){
        res.redirect("/");
    });
});

app.get("/file/:filename", function(req, res) {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function(err, fileData) {
        if(err) {
            console.error(err); // Handle error
            res.status(500).send('Internal Server Error');
            return;
        }
        res.render("show", { filename: req.params.filename, filedata: fileData });
    });
});

app.get("/edit/:filename",function(req,res){
    res.render("update",{filename:req.params.filename});
});
app.post("/edits",function(req,res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.newname}`,function(er){
        if(er){
            console.log("Internal error");
        }
        else{
            res.redirect("/");
        }
    });
});



app.listen(3000,()=>{
    console.log("server starting")
})