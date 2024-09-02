// (function(){
//     console.log("My name is Abdul Wahab");  
// })(); // Paranthesis on the end means we are calling this function. so To call this function we must use it.



//CallBack Function

// function add (a,b,addMsg){
//     let result = a+b;
//     console.log("Result: "+result)
//     addMsg(); //addMsg is a callback func bcs it is called inside the function.
// }

// add(2,25, () => console.log("No's added successfully and callback function is running this statement"))



//Built in Modules in node js 

// var fs = require("fs")
// var os = require("os")
// let user = os.userInfo()//gives systm details
// console.log(user);

// fs.appendFile('greeting.txt', 'Hi '+user.username +'!\n', () => console.log("File is created")
// );




//Import other Files in server.js to access the functionality of those files.

// const notes = require('./notes.js')
// let rslt = notes.addNum(notes.age+2,8)
// console.log(notes.age);
// console.log("Result: "+ rslt)


//Load Ash
// var _ = require('loadash');
// let data = ['name','name',1,2,2,1,'4','2'];
// const abc = _.uniq(data);
// console.log(abc);


//Express
const express = require('express')
const app = express()
const db = require('./db') //when this line executes it will perform the action defined inside db file.
require('dotenv').config();
const passport = require('./Auth')

const bodyParser = require('body-parser')//npm i body-parser
app.use(bodyParser.json());// it will convert json data to object and stores in req.body.
const PORT = process.env.PORT || 3000;


//Logging
//Middleware Function
const logRequest = (req, res, next) =>{
    //Here we are checking that at which time request made to which URL.
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next(); //next is a callback that signals to express that current midleware func has completed its processing now move on to the nxt phase.
}

//Generally we perform logging on every end point so for this we use.
app.use(logRequest) //we use this when we want to do logging on hitting every url. for specific url like person we will not use this.
//for specific we will use like app.get('/', logRequest, (req, res))


app.use(passport.initialize());
//Authentication to use local strategy
const localAuthMiddleware = passport.authenticate('local', {session: false});


app.get('/', (req, res) => {
    res.send("Welcome to our Hotel")
})

//import the router file for person
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes');
const Person = require('./model/Person');

//Use the routers
app.use('/person', personRoutes)
app.use('/menuitem', menuRoutes)
// app.post('/data', (req,res) =>{
//     res.send('data is saved')
// })

// app.get('/menu', (req, res) => {
//     let list_menue = {
//         name : "Daal",
//         Price: 200
//     }
//     res.send(list_menue)
// })

app.listen(PORT);