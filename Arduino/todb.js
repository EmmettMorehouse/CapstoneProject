/*
 * Emmett Morehouse/John Yun/Jessica Warren/Brayton Rider
 * 04/05/2020
 * Kent State University Capstone Project
 */

var mqtt = require('mqtt'); //includes mqtt server 
var mongodb = require('mongodb'); // includes mongoDB 
var mongodbClient = mongodb.MongoClient;
var mongodbURI = 'mongodb://localhost:27017/sound'; //activating the MongoDB port 27017, here voltage is the name of the database
var deviceRoot = "arduino/sound/"; //deviceroot is topic name given in arduino code 
var collection,client; //initialise collection and client
var assert = require('assert');

mongodbClient.connect('mongodb://localhost:27017/', function (err, client) {
  if (err) throw err;
  assert.equal(null, err);
  console.log("Connected successfully to server");

  var db = client.db('sound');
  collection = db.collection('voltage');
  client=mqtt.connect({ host: "192.168.1.184", port: 1883 });
  client.subscribe(deviceRoot+"+");
  //client.on('message', insertEvent);
  client.on('message', insertEvent); 
});

//function that displays the data in the MongoDataBase
function insertEvent(topic, payload) {
  var toDB = parseFloat(payload)
  console.log(toDB)
  collection.insertOne(
  { analogValue:toDB, datetime:new Date() },
  { upsert:true },

  function(err,docs) {  
  if(err) {
    console.log("Insert fail")	
    }
 }
 );
}