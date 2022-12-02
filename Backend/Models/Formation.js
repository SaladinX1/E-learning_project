const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');
const User = require('./User');


const Formation = sequelize.define('Formations', {

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
    price: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false 
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
    }
})

User.hasMany(Formation);
Formation.belongsTo(User);



module.exports = Formation;