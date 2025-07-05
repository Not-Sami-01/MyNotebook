"use strict";
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
connectToMongo();

app.use(express.json());
app.use(cors());

// Available routes
app.use('/api/notes',require('./routes/notes'));
app.use('/api/auth',require('./routes/auth'));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.get('/about', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Handle all other routes by serving React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});