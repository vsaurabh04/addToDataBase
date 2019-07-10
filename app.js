const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

var firebase = require("firebase/app");

require("firebase/firestore");
require("firebase/database");

var firebaseConfig = {
    apiKey: "AIzaSyCWY5hULyXBoO8tm3VTj4M6hmXE9t4gX60",
    authDomain: "projecthydra-88355.firebaseapp.com",
    databaseURL: "https://projecthydra-88355.firebaseio.com",
    projectId: "projecthydra-88355",
    storageBucket: "projecthydra-88355.appspot.com",
    messagingSenderId: "799269940014",
    appId: "1:799269940014:web:b60c468cc110b707"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(path.join(__dirname)));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


var server=app.listen(app.get('port'), function(){
  console.log('Server started on port '+app.get('port'));
});

// Main
app.get('/', function(req,res,next){
    res.render('form');
  });


app.post("/addToDatabase", function(req, res, next){
    let ref = firestore.collection('Doctors').doc();
    console.log(req.body.docName);
    let getDoc = ref.get()
  .then(doc => {
    // console.log("Reached here Correct place");
    var item = {
        docName:req.body.docName,
        Spec: req.body.Spec,
        address: req.body.address,
        id: req.body.id,
        img: req.body.img,
        email: req.body.mail,
        phone: req.body.phone,
        timing: req.body.timing,
        title:req.body.title,
        location : {
            latitude : 54.2362732,
            longitude : 23.7326615
        }
    } 
    // var item = {
    //     docName : "Saurabh k"
    // }

    ref.set(item).then(()=>{
        console.log("Data saved");
    })
    .catch(err =>
        {
            console.log("I dont know the problem ");
        });
  })
  .catch(err=>{
    console.log("Reached here InCorrect place");

  });
    
    res.redirect("/");
});