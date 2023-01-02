const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const userRoutes = require('./Routes/User');
const formationRoutes = require('./Routes/Formation');
const auth = require('./Midlewares/auth');
 //const bodyParser = require('body-parser');


 app.use(cors());

 app.use(express.json())
 app.use(express.urlencoded( { extended: true } ));

 app.use('/pictures', express.static(path.join(__dirname, 'pictures')));

app.use('/api', userRoutes);
app.use('/api', formationRoutes);


module.exports = app;