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

const bodyParser = require('body-parser')//npm i body-parser
app.use(bodyParser.json());// it will convert json data to object and stores in req.body.
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("Welcome to our Hotel")
})

//import the router file for person
const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

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