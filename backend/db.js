"use strict";
const mongoose = require('mongoose');
require('dotenv').config();
const mongoURI = process.env.DB_URI;
async function connectToMongo(){
  await mongoose.connect(mongoURI);
  console.log('Connection was successful');
}


module.exports = connectToMongo;