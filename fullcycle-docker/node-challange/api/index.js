const express = require('express');
const mysql = require('mysql');
const randomName = require('node-random-name');

// App config
const app = express();
const PORT = 3000;

// DB Connection
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const connection = mysql.createConnection(config);

const createTableQuery = 'CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id))';
connection.query(createTableQuery);

const insertNameQuery = `INSERT INTO people(name) values('${randomName()}')`;
connection.query(insertNameQuery);

const getNamesQuery = 'SELECT * FROM people';
const listNames = [];
connection.query(getNamesQuery, function (err, result) {
  if (err) throw err;
  result.map((result) => {
    listNames.push(result.name);
  });
});

connection.end();

app.get('/', (request, response) => {
  response.send(`<h1>Full Cycle Rocks!</h1><br><h2>Nomes cadastrados</h2><br><p>${listNames}</p>`);
});

app.listen(PORT, () => {
  console.log(`Application runnning on ${PORT}`);
});