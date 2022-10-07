const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const ctrlUser = require('./Controllers/Users')


app.use(cors());

app.use(express.json()); 


app.use(ctrlUser);


module.exports = app;