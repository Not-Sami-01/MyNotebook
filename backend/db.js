"use strict";
const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mynotebook';
async function connectToMongo(){
  await mongoose.connect(mongoURI);
  console.log('Connection was successful');
}


module.exports = connectToMongo;