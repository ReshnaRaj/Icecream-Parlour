var express=require('express');
var path=require('path');
var cookieParser = require('cookie-parser');
var app=express();
var userRouter=require('./routes/user');
var adminRouter=require('./routes/admin')
var session=require('express-session');
var db=require("./config/connection")



app.use(function (req, res, next) {
    if (!req.user) {
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        res.header('Expires', '-1');
        res.header('Pragma', 'no-cache');
    }
    next();
});

// view engine setup;

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','hbs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'key',cookie: {maxAge:60000000}}));

db.connect((err)=>{
    if(err){
    console.log("connection error"+err);
    }
    else{
    console.log("Database connected port 27017");
    }
   })


app.use("/",userRouter);//giving the   path what we want to type in the url means if we type the '/' it will goes to userlogin page
app.use('/admin',adminRouter);// goes to the admin login page



// port setting;
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));