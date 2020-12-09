'use strict'

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Mycell=816',
  database : 'flyguide_app'
});

connection.connect();

const app = express();

app.use(cors())

app.use(bodyParser.json());

//---> start endpoints



//---> Trips



//---> Clients

app.get('/clients/:uid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addclient', (req, res) => {
  //console.log(req.body);
  connection.query(`INSERT INTO clients (uid, clientFirstName, clientLastName, clientEmail, clientPhone, clientNotes) VALUES ('${req.body.uid}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.phone}', '${req.body.notes}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//---> Spots

app.get('/myspots/:uid', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addspot', (req, res) => {
  //console.log(req.body);
  connection.query(`INSERT INTO mySpots (uid, locationName, subLocationName) VALUES('${req.body.uid}', '${req.body.locationName}', '${req.body.subLocationName}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.get('/myspots/editspot/:id', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE spotId = '${req.params.id}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.put('/editspot', function (req, res) {
  connection.query(`UPDATE mySpots SET locationName = '${req.body.locationName}', subLocationName = '${req.body.subLocationName}' WHERE spotId = '${req.body.spotId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/deletespot', function (req, res) {
  //console.log(req.body.flyId);
  connection.query(`DELETE FROM mySpots WHERE spotId = ${req.body.spotId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> flybox

app.get('/flybox/:uid', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addfly', (req, res) => {
  connection.query(`INSERT INTO flybox (uid, flyPattern, flyType) VALUES('${req.body.uid}', '${req.body.flyPattern}', '${req.body.flyType}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.get('/flybox/editfly/:id', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE flyId = '${req.params.id}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.put('/editfly', function (req, res) {
  connection.query(`UPDATE flybox SET flyPattern = '${req.body.flyPattern}', flyType = '${req.body.flyType}' WHERE flyId = '${req.body.flyId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/deletefly', function (req, res) {
  //console.log(req.body.flyId);
  connection.query(`DELETE FROM flybox WHERE flyId = ${req.body.flyId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> end endpoints

app.listen(3000);
