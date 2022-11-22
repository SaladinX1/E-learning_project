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
    file: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file2: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file3: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file4: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file5: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file6: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file7: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file8: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file9: {
        type: Sequelize.STRING,
        allowNull: false
    },
    file10: {
        type: Sequelize.STRING,
        allowNull: false
    },
    duration: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Formation;