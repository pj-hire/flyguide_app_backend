const express = require('express');
const mysql = require('mysql');
const router = express.Router();
// const dbCred = require('../private/db_credentials')

//---> start endpoints

router.get('/aaidreport', (req, res) => {
  connection.query(`SELECT reportId FROM reports ORDER BY reportId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//--> select all reports from single trip based on tripId
router.get('/reports/:tripid', (req, res) => {
  connection.query(`SELECT * FROM reports WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.post('/reports', (req, res) => {
  connection.query(`INSERT INTO reports (reportId, tripId, uid, spotId, notes) VALUES (?, ?, ?, ?, ?)`,[
    req.body.reportId,
    req.body.tripId,
    req.body.uid,
    req.body.spotId,
    req.body.notes
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.put('/reports', function (req, res) {
  connection.query(`UPDATE reports SET notes = ?, spotId = ? WHERE reportId = ?`,[
    req.body.notes,
    req.body.spotId,
    req.body.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete report
router.delete('/reports/:reportId', function (req, res) {
  connection.query(`DELETE FROM reports WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete all reports associated with a tripId
router.delete('/reports-trip/:tripId', function (req, res) {
  connection.query(`DELETE FROM reports WHERE tripId = ?`,[
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
