const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const modelUser = require('./Models/User');

 app.use(modelUser);

app.use(cors());

app.use(express.json()); 



module.exports = app;