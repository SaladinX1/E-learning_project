const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const userRoutes = require('./Routes/User');
const moduleRoutes = require('./Routes/module');
const auth = require('./Midlewares/auth');
 //const bodyParser = require('body-parser');


 app.use(cors());

 app.use(express.json());
 app.use(express.urlencoded( { extended: true } ));

 app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api', userRoutes);
app.use('/api', moduleRoutes);


module.exports = app;