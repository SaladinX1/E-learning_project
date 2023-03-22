const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const Module = require('./Module');


const Formation = sequelize.define('Formation', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nameFormation: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
    },
    priceFormation: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: false
    },
    namesModules: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
        defaultValue: false
    },
    durationFormation: {
       type: Sequelize.STRING,
       allowNull: false,
        defaultValue: false
    },
    docsFormationCodes: {
        type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
        allowNull: false,
        defaultValue: false
    }
})


Formation.hasMany(Module);
Module.belongsTo(Formation);



module.exports = Formation;