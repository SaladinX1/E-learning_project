const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const User = require('./User');
const Formation = require('./Formation');



const ProduitsAchetes = sequelize.define('produits_achetes', {
    date_achat: Sequelize.DATE,
  });


  User.belongsToMany(Formation, { through: ProduitsAchetes });
  Formation.belongsToMany(User, { through: ProduitsAchetes });