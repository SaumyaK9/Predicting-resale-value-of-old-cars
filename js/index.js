var express=require("express")
var bodyParser=require("nodbody-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/DataBase')
var db=mongoose.connection
db.on('error',()=> console.log("Error in Connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/signup",(req,res)=> {
    var Name=req.body.Name
    var Email=req.body.Email
    var Password=req.body.Password

    var data={
        "Name":Name,
        "Email":Email,
        "Password":Password
    }
    db.collection('users').insertOne(data,(err,collection) => {
        if(err){
            throw err;
        }
        console.log("recod Inserted Succefully")
    })
    return res.redirect('success.html')
})

app.get("/",(req,res) => {
    res.setHeader(
        "Allow-Access-Allow-Origin",'*')
    return res.redirect('index.html')
}).listen(3000);

console.log("Listening on port 3000")
