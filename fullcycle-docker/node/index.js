const express = require('express');
const app = express();
const PORT = 3000;
const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

const sql = `INSERT INTO people(name) values('Gusta')`;
connection.query(sql);
connection.end();

app.get('/', (request, response) => {
  response.send('<h1>FullCycle</h1>');
});

app.listen(PORT, () => {
  console.log(`Application runnning on ${PORT}`);
});