"use strict";

const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  status:{
    type: Boolean,
    required:true,
    default:1
  },
  datetime:{
    type: Date,
    required:true,
    default:Date.now
  }
})
const User = mongoose.model('user', UserSchema);
module.exports = User;
