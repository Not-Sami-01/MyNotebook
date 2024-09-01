"use strict";

const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'  // reference to User model
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 150,
  },
  description: {
    type: String,
    required: true
  },
  tag: {
    required: true,
    default: "general",
    type: String
  },
  datetime: {
    type: Date,
    required: true,
    default: Date.now,
  }
})

module.exports = mongoose.model('note', NoteSchema);