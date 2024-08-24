
const mongoose = require('mongoose');
require('dotenv').config();

//Define mongodb connection url.This is local url
//const mongoURL = process.env.DB_URL_Local
const mongoURL =  process.env.ONLINE_DB_URL;
//Setup mongodb connenction

mongoose.connect(mongoURL)

//Get the default connection 
//mongoose maintains a default connection object representing the MongoDB connection

const db = mongoose.connection;

//Define event listners for database connection

db.on('connected', ()=>{
    console.log("connected to mongodb server");
});
db.on('error', ()=>{
    console.log("MongoDB connection error");
});
db.on('disconnected', ()=>{
    console.log("mongodb disconnected");
});

//Export

module.exports = db;