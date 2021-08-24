const express =require("express")
const bodyParser=require("body-parser")
const https =require("https")
const request =require("request");

const app =express();
app.use(express.static("public"))




app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
var fname=req.body.fname
var Sname=req.body.Sname
var email=req.body.email

var data ={
    members:[
        {
            email_address:email,
            status:"subscribed",
            merge_fields:{
                FNAME:fname,
                LNAME:Sname
            }
        }
    ]
}
const jsonData=JSON.stringify(data);
const url="https://us5.api.mailchimp.com/3.0/lists/3e16ea6adc"
const option ={
    method:"POST",
    auth:"sandesh2001:873c41962ed7c207acecedb78165aada-us5",

     
}
const request =https.request(url,option,function(response){
    if(response.statusCode===200){
res.sendFile(__dirname+"/success.html")
    }
    else{
res.sendFile(__dirname+"/failure.html")
    }
response.on("data",function(data){
console.log(JSON.parse(data));
})
})

request.write(jsonData)
request.end()
})


app.post("/faiure",function(re,res){
    res.redirect("/")
})
app.listen(process.env.PORT ||3000,function(){
    console.log("server is running on port 3000");
})
