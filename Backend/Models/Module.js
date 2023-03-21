const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const User = require('./User');


const Module = sequelize.define('Module', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nameModule: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
    },
    durationModule: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
    },
    allDocs: {
       type: Sequelize.STRING,
       allowNull: true,
        defaultValue: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: false
    }
})

User.hasMany(Module);
Module.belongsTo(User);



module.exports = Module;