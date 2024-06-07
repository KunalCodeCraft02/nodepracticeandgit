// CREATING FILE IN NODE JS 

const fs = require('fs');
const express = require('express');
const app = express();

// fs.writeFile("brain.txt","I AM THE BILLIONER",function(e){
//     if(e){console.log(e)}
//     else{console.log("File was created")}
// });

// APPENDING TEXT IN FILE 

// fs.appendFile("brain.txt"," AND MY COMPANY VALUATION IS 1 TRILLION DOLLER",function(e){
//     if(e){console.log(e)}
//     else{console.log("Done")}
// });


// RENAME FILE IN NODE JS 


// fs.rename("brain.txt","hello.txt",(e)=>{
//     if(e){console.log(e);}
//     else console.log("File renamed");
// })

// DELETE FILE USING UNLINK


// fs.unlink('hello.txt',(e)=>{
//     if(e) console.log(e)
//     else console.log("File Deleted")
// })




// TIP : PROTOCOLS MEANS A SET OF RULES



// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// jab bhi hum koi form fill karte he to sarra brower ka data aur hamara data server pe jata he but usko hame decode karna padta he 
// express.json matlab hum usko json me decode krr rahe he 




// const express = require("express")
// const app = express();
// const path = require("path");

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

// app.use(express.static(path.join(__dirname,'public')));
// app.set('view engine','ejs');

// app.get("/",function(req,res){
//     res.send("Hello")
// });
// app.get("/web/:kuchbhi",function(req,res){  ------> TIP: JAB HUM : LAGAKE KUCH BHI LIKHATE HE TO VO WALA PART DYNAMIC HO JATA HE MATLAB AGAR HAMNE WEB/ANIMIT LIKA HOTA TO VO PAGE DIKHTA BUT AGAR WEB/ANKITA LIKHATA TO ERROR ATA ESILIYE HAME VO WALA PART DYNAMIC
//     res.render('index');
// })

// app.listen(3000,(e)=>{
//     console.log("Server Started");
// })