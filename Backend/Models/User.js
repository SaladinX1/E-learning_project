const Sequelize = require('sequelize');
const sequelize = require('../Database/db.script');



const User = sequelize.define('Users', {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        unique: false
    },
    secondName: {
        type: Sequelize.STRING,
        unique: false
    },
    email: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    telephone: {

        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autorisationDocument: {

        type: Sequelize.STRING
    },
    documentType: {

        type: Sequelize.STRING,
     },
     factures: {
          type: Sequelize.STRING,
         allowNull: true
      },
     admin : {
         type: Sequelize.DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false
     },
     reaTeachers : {
         type: Sequelize.DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false
     },
     reaEx : {
         type: Sequelize.DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false
     },
     rea3 : {
         type: Sequelize.DataTypes.BOOLEAN,
         allowNull: true,
         defaultValue: false
     }
});


module.exports = User;