const express = require('express');
const mysql = require('mysql');
const router = express.Router();
let dbCred
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  dbCred = require('../private/db_credentials');
} else {
  dbCred = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  }
}

//---> start endpoints

router.get('/clients-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/clients/:tripid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.post('/clients', (req, res) => {
  connection.query(`INSERT INTO clients (uid, tripId, clientFirstName, clientLastName, clientEmail, clientPhone, clientNotes) VALUES (?, ?, ?, ?, ?, ?, ?)`,[
    req.body.uid,
    req.body.tripId,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.phone,
    req.body.notes
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.put('/clients', function (req, res) {
  connection.query(`UPDATE clients SET clientFirstName = ?, clientLastName = ?, clientEmail = ?, clientPhone = ?, clientNotes = ? WHERE clientId = ?`,[
    req.body.clientFirstName,
    req.body.clientLastName,
    req.body.clientEmail,
    req.body.clientPhone,
    req.body.clientNotes,
    req.body.clientId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/clients/:id', function (req, res) {
  connection.query(`DELETE FROM clients WHERE clientId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/clients-trip/:tripid', function (req, res) {
  connection.query(`DELETE FROM clients WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> end endpoints

const connection = mysql.createConnection(dbCred);
connection.connect();

module.exports = router
