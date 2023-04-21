const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const User = require('./User');
const Formation = require('./Formation');



const ProduitsAchetes = sequelize.define('produits_achetes', {

    nom: {
        type: Sequelize.STRING,
        //allowNull: false,
    },
    prix: {
        type: Sequelize.INTEGER,
       // allowNull: false,
    },
  date_achat: {

      type: Sequelize.DATE,
      allowNull: false,
  },
      FormationId: {
          
          type: Sequelize.INTEGER,
          allowNull: false,
          
        },
        UserId: {
            type: Sequelize.INTEGER,
            //allowNull: false,
        },
    notation : {
       type: Sequelize.DataTypes.INTEGER,
       allowNull: true,
       defaultValue: 0
    },
    progressTime : {
       type: Sequelize.DataTypes.INTEGER,
       allowNull: true,
       defaultValue: 0
    },
    idModuleProgress : {
       type: Sequelize.DataTypes.INTEGER,
       allowNull: true,
       defaultValue: 0
    },
    barProgress : {
       type: Sequelize.DataTypes.INTEGER,
       allowNull: true,
       defaultValue: 0
    },
})



User.belongsToMany(Formation, { through: ProduitsAchetes, foreignKey: 'UserId' })


  module.exports = ProduitsAchetes;