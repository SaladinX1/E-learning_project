const mysql = require('mysql2');

    const db = mysql.createConnection( 
        host="localhost",
        user="Saladin_Rising",
        password='Razorback2.2',
        database='normesse_formations'
     )

        db.connect();

    module.exports = db;

