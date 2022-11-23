const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');


const Formation = sequelize.define('Formations', {

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
    file: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file2: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file3: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file4: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file5: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file6: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file7: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file8: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file9: {
        type: Sequelize.STRING,
        allowNull: true
    },
    file10: {
        type: Sequelize.STRING,
        allowNull: true
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Formation;