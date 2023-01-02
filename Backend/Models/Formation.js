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
    priceFormation: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: false 
    },
    pdfs: {
        type: Sequelize.BLOB,
        allowNull: true,
        defaultValue: false 
    },
    durationFormation: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: false
    },
    picture: {
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

User.hasMany(Formation);
Formation.belongsTo(User);



module.exports = Formation;