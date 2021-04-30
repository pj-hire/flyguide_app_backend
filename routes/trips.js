const express = require('express');
const mysql = require('mysql');
const router = express.Router();
// const dbCred = require('../private/db_credentials')

//---> start endpoints

router.get('/aaidtrip', (req, res) => {
  connection.query(`SELECT tripId FROM trips ORDER BY tripId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/trips-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM trips WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/trips/:tripid', (req, res) => {
  connection.query(`SELECT * FROM trips where tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.post('/trips', (req, res) => {
  connection.query(`INSERT INTO trips (uid, date, guideOrPersonalTrip, guideTripType, guideTripNumberInParty, tripNotes) VALUES(?, ?, ?, ?, ?, ?)`,[
    req.body.uid,
    req.body.date,
    req.body.tripType,
    req.body.guideTripType,
    req.body.numberInParty,
    req.body.tripNotes
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.delete('/trips/:tripId', function (req, res) {
  connection.query(`DELETE FROM trips WHERE tripId = ?`,[
    req.params.tripId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
    })
  })

//---> end endpoints

// const connection = mysql.createConnection(dbCred);
// connection.connect();

module.exports = router
