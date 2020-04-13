/*
 * Emmett Morehouse/John Yun/Jessica Warren/Brayton Rider
 * 04/05/2020
 * Kent State University Capstone Project
 */

require('dotenv').config({ path: '../.env' })
const mongoURI = process.env.mongoURI
var mqtt = require('mqtt'); //includes mqtt server 
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient;
var mongodbURL = mongoURI
var deviceRoot = "arduino/sound/"; //deviceroot is topic name given in arduino code 
var collection,client; //initialise collection and client
var assert = require('assert');

mongodbClient.connect(mongodbURL, function (err, client) {
  if (err) throw err;
  assert.equal(null, err);
  console.log("Connected successfully to server");

  var db = client.db('sound');
  collection = db.collection('analog');
  client=mqtt.connect({ host: "192.168.1.184", port: 1883 });
  client.subscribe(deviceRoot+"+");
  //client.on('message', insertEvent);
  client.on('message', insertEvent); 
});

//function that displays the data in the MongoDataBase
function insertEvent(topic, payload) {
  var toDB = parseFloat(payload)
  console.log(toDB)
  var date = new Date()
  var localDateTime = date.toLocaleString('en-US')
  collection.insertOne(
  { analogValue:toDB, datetime:localDateTime },
  { upsert:true },

  function(err) {  
  if(err) {
    console.log("Insert fail")	
    }
 }
 );
}