var express = require("express")
var mongoose =require("mongoose")
var path = require("path")

var eventsRouter = require('./routes/event');
var remarkRouter = require('./routes/remark');
var categoryRouter = require('./routes/category');
var locationRouter = require('./routes/location');
var dateRouter = require('./routes/date');

mongoose.connect("mongodb://localhost/blog" , {useNewUrlParser:true , useUnifiedTopology:true} , (err)=> {
    console.log(err ? err: "connect to database")
})


var app = express()

//middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//setup view engine
app.set("view engine" , "ejs" )
app.set("views" , path.join(__dirname , "views"))

//routing middleware
app.use('/event', eventsRouter);
app.use('/remark', remarkRouter);
app.use('/category', categoryRouter);
app.use('/location', locationRouter);
app.use('/date', dateRouter);


//Error handler
app.use((req,res,next)=> {
    res.send("Page not found")
})

app.use((err,req,res,next)=> {
    res.send(err)
})

//listen
app.listen(5000,()=>{
    console.log("server listening to port 5000")
})