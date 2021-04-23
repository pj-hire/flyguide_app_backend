const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbCred = require('../private/db_credentials')

//---> start endpoints

router.get('/spots-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/spots/:spotid', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE spotId = ?`,[
    req.params.spotid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/spots/editspot/:id', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE spotId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

router.post('/spots', (req, res) => {
  connection.query(`INSERT INTO mySpots (uid, locationName, subLocationName) VALUES(?, ?, ?)`,[
    req.body.uid,
    req.body.locationName,
    req.body.subLocationName
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.put('/spots', function (req, res) {
  connection.query(`UPDATE mySpots SET locationName = ?, subLocationName = ? WHERE spotId = ?`,[
    req.body.locationName,
    req.body.subLocationName,
    req.body.spotId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/spots/:spotId', function (req, res) {
  connection.query(`DELETE FROM mySpots WHERE spotId = ?`,[
    req.params.spotId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> end endpoints

const connection = mysql.createConnection(dbCred);
connection.connect();

module.exports = router
