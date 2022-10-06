const mysql = require('mysql2');

    const db = mysql.createConnection({   host: "localhost",   user: "Saladin_Rising",   password: "Razorback2.2" });

         db.connect(function(err) {   if (err) throw err;   console.log("Connecté à la base de données MySQL!"); });


          db.query('USE normesse_formations', function (err, result) { if (err) throw err; console.log(result);})
          db.query('SHOW TABLES', function (err, result) { if (err) throw err; console.log(result);})
          db.query('SHOW COLUMNS FROM user', function (err, result) { if (err) throw err; console.log(result);})
         

    module.exports = db;

    
    
    