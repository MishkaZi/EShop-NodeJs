const mysql = require('mysql2');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '1234',
//   database: 'super-market',
// });


// Heroku:
//mysql://b5c692261ba773:841aa6b5@us-cdbr-east-04.cleardb.com/heroku_5bb9c459640a5b6?reconnect=true
const connection = mysql.createPool({
  host: 'us-cdbr-east-04.cleardb.com',
  user: 'b5c692261ba773',
  password: '841aa6b5',
  database: 'heroku_5bb9c459640a5b6',
});
// // Connect to the database:
// connection.connect((error) => {
//   if (error) {
//     return;
//   }
//   console.log("We're connected to MySQL");
// });

// One function for executing select / insert / update / delete:
function execute(sql) {
  return new Promise((resolve, reject) => {
    connection.query(sql, (error, result) => {
      if (error) {
        console.log('Failed interacting with DB, calling reject');
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
    connection.query(sql, parameters, (error, result) => {
      if (error) {
        console.log('Failed interacting with DB, calling reject');
        reject(error);
        return;
      }

      resolve(result);
    });
  });
}

module.exports = {
  execute,
  executeWithParameters,
};
