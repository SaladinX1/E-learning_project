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
        },barProgress: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        idModuleProgress: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        progressTime: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        notation: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        isQuizzBlocked: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0
        },
        autoUnblockAt: {
            type: Sequelize.DATE,
            allowNull: true
        },
        blockedAt: {
           type: Sequelize.DATE,
            defaultValue: 0
        }
        ,
        blockTime: {
           type: Sequelize.INTEGER,
            defaultValue: 0
        }
        ,
        success: {
           type: Sequelize.BOOLEAN,
           allowNull: true,
            defaultValue: 0
        }
})


Formation.belongsToMany(User, { through: ProduitsAchetes , foreignKey: 'FormationId' });
User.belongsToMany(Formation, { through: ProduitsAchetes , foreignKey: 'UserId' });

  module.exports = ProduitsAchetes;