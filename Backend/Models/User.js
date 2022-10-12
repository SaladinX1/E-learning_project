const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');

const User = sequelize.define('Users', {
   
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    secondName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    email: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true

    },
    telephone: {

        type: Sequelize.NUMBER,
        allowNull: true,
        unique: true

    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    documentType: {

        type: Sequelize.BLOB,
        allowNull: false
    },
    autorisationDocument: {

     type: Sequelize.STRING,
     allowNull: false,
     unique: true
 },
    documentType: {

        type: Sequelize.STRING,
        allowNull: false
    },
    admin : {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    }
});



module.exports = User;