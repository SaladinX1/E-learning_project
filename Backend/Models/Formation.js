const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');


const Formation = sequelize.define('Formation', {

    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false 
    },
    document: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Formation;