const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const User = require('./User');
const Formation = require('./Formation');



const ProduitsAchetes = sequelize.define('produits_achetes', {
    nom: Sequelize.STRING,
    prix: Sequelize.FLOAT,
    userId: Sequelize.INTEGER,
    referenceId: Sequelize.STRING,  
    date_achat: Sequelize.DATE,
  });


  User.belongsToMany(Formation, { through: ProduitsAchetes });
  Formation.belongsToMany(User, { through: ProduitsAchetes });


  module.exports = ProduitsAchetes;