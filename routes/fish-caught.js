const express = require('express');
const mysql = require('mysql');
const router = express.Router();
// const dbCred = require('../private/db_credentials')

//---> start endpoints

router.get('/fishcaught-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM fishCaught WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/fishcaught/:reportid', (req, res) => {
  connection.query(`SELECT * FROM fishCaught WHERE reportId = ?`,[
    req.params.reportid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.post('/fishcaught', (req, res) => {
  connection.query(`INSERT INTO fishCaught (uid, reportId, fishSpeciesId, speciesName, qtyCaught) VALUES(?, ?, ?, ?, ?)`,[
    req.body.uid,
    req.body.reportId,
    req.body.fishSpeciesId,
    req.body.speciesName,
    req.body.qtyCaught
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.delete('/fishcaught/:reportId', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/fishcaught-id/:id', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE fishCaughtId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/fishcaught-trip/:reportId', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> FISH CAUGHT QUANTITY
router.post('/fishcaughtqty', (req, res) => {
  connection.query(`UPDATE fishCaught SET qtyCaught = ? WHERE fishCaughtId = ?`,[
    req.body.qtyCaught,
    req.body.fishCaughtId
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//---> end endpoints

// const connection = mysql.createConnection(dbCred);
// connection.connect();

module.exports = router
