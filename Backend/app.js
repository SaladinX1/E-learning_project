const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const db = require('./Database/db.script');
const userRoutes = require('./Routes/User');
const moduleRoutes = require('./Routes/module');
const formationRoutes = require('./Routes/formation');
const PA = require('./Routes/produitsAchetes');
const auth = require('./Midlewares/auth');


 const dotenv = require('dotenv');

dotenv.config();

 app.use(cors());

 app.use(express.json());
 app.use(express.urlencoded( { extended: true } ));

 app.use('/images',express.static(path.join(__dirname, 'images')));

app.use('/api', userRoutes);
app.use('/api', moduleRoutes);
app.use('/api', formationRoutes);
app.use('/api', PA);


module.exports = app;