const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');
require('dotenv').config(); 
 // create db if it doesn't already exist
 const host = 'localhost';
 const port = 3306;
 const database = 'normesse_formations';

 // Veuillez remplacer le password et l'username par un utilisateur de votre SGBD !

 const user = process.env.ROOT;

 const password = process.env.DBPASS; 
 

 const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });


async function initialize() {

  const connection = await mysql.createConnection({ host, port, user, password });

 
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);

    await sequelize.sync().then( res => {
      console.log('Connexion réussi à la base de données !')
    }).catch(err => console.log('Connexion échoué !', err))
    
}

initialize();

module.exports = sequelize;
