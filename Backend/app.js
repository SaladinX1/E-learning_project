const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const userRoutes = require('./Routes/User');
const auth = require('./Midlewares/auth');
 const bodyParser = require('body-parser');

 app.use(cors());

//  app.use(express.json()); 
//  app.use(express.urlencoded({
//     extended: true
//   })); 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json())

app.use('/api', userRoutes);


module.exports = app;