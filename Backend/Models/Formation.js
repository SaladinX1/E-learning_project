const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const Module = require('./Module');
const User = require('./User');

const Formation = sequelize.define('Formation', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    nameFormation: {
      type: Sequelize.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    priceFormation: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    namesModules: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: []
    },
    modulesCompo: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: []
    },
    durationFormation: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    docsFormationCodes: {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: []
    }
    ,
    // role: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: false
    // },
    // descFormation: {
    //     type: Sequelize.STRING,
    //     allowNull: false,
    //     defaultValue: false
    // },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false
    }
  }, {
    tableName: 'Formations',
    engine: 'InnoDB'
  });
  
  Formation.belongsTo(User, { foreignKey: 'UserId', onDelete: 'SET NULL', onUpdate: 'CASCADE' });
  
  
  User.hasMany(Formation);
Formation.hasMany(Module);
Module.belongsTo(Formation);


module.exports = Formation;