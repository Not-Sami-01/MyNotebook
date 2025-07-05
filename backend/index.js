"use strict";
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const port = 5000;
const app = express();
connectToMongo();

app.use(express.json());
app.use(cors());

// Available routes
app.use('/api/notes',require('./routes/notes'));
app.use('/api/auth',require('./routes/auth'));

app.get('/', (req, res)=>{
  console.log(req.body);
  res.send('Hello World');
}),
app.get('/about', (req, res)=>{
  res.send('Hello About');
}),

app.listen(port, 'localhost', ()=>{
  console.log(`The app is listening on  http://localhost:${port}`);
});
