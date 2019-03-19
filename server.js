const express = require('express');
const app = express();
app.use(express.static('frontEnd'));
const bodyParser = require('body-parser');
const passport=require('passport');
const passportLocal=require('passport-local');
const session=require('express-session');
const cookieParser=require('cookie-parser');

const DB=require("./database");
var bcrypt = require('bcrypt');
const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
var hep=0;
app.use(session({secret:'i am not dog'}));
app.use(passport.initialize());
app.use(passport.session());
app.post('/login',passport.authenticate('local',
    {
        successRedirect:'/success',
        failureRedirect:'/failure'
    }
    )
)

passport.use(new passportLocal(function (username,password,done) {
    if (!username || !password) {
        return done(null, false, {message: "enter all fields"})
    }
   DB.connection.query("SELECT * FROM worker WHERE name = ?",[username], function (err, results, fields) {

 /*      bcrypt.hash(password, saltRounds, function(err, hash) {
           // Store hash in your password DB.
 console.log(results[0])
           console.log(hash)
           if (results[0].name !==username) {
               return done(null, false, {message: "username Incorrect"});}
           else if(results[0].pass === hash){
               return done(null, false, {message: 'password incorrect'});
           }
           return done(null,results[0].id );
       })
             });*/
       if (results[0].name !==username) {
           return done(null, false, {message: "username Incorrect"});}
       else if(results[0].pass === password){
           return done(null, false, {message: 'password incorrect'});
       }
return done(null,results[0].id );
})
}));
passport.serializeUser(function (id, done) {
    return done(null,id);
})
passport.deserializeUser(function (id, done) {
    DB.connection.query("select * from worker where id = ?",[id], function (err, results){
        done(err, results[0]);
    })})
app.get('/success',function (req, res) {
    res.send(req.user);
/*
    var div =document.createElement("div");
    var divname=document.createElement("H3");
    divname.innerText=res.user.name;
    div.appendChild(divname)
*/

})
app.get('/failure',function (req, res) {
    res.sendStatus(404);
})
app.get('/test',function (req, res) {
    if (req.user)
    {
        res.send("password is 10")
    }
    else{
        res.send("wrong username/password");
    }
})


app.post('/data',function (req, res) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(req.body.pass, salt, function(err, hash) {
            console.log(typeof(req.body.lat));
            DB.addData(req.body.name,req.body.pro,req.body.lat.substr(0,10),req.body.pno,hash,req.body.fees,function () {
                res.send({"redirect": true, "redirect_url": "http://localhost:5000/index.html"});
            });
        });
    });
});
var halo;
app.post('/user',function (req, res) {
    DB.sendUser(req.body.lat,req.body.lon,req.body.text,function (data) {
        halo=data;
    });
    res.send({"redirect": true, "redirect_url": "http://localhost:5000/layout.html"});
})
app.post('/haloo',function (req,res) {
    res.send(halo);
})
app.listen(5000, function(){
    console.log("Server running on port 5000");
    DB.connectDB();
});
