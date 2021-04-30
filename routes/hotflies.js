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

router.get('/hotflies-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM hotFlies WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/hotflies/:reportid', (req, res) => {
  connection.query(`SELECT * FROM hotFlies WHERE reportId = ?`,[
    req.params.reportid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.post('/hotflies', (req, res) => {
  connection.query(`INSERT INTO hotFlies (uid, reportId, size, pattern, color) VALUES(?, ?, ?, ?, ?)`,[
    req.body.uid,
    req.body.reportId,
    req.body.size,
    req.body.pattern,
    req.body.color
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.delete('/hotflies-fly/:id', function (req, res) {
  connection.query(`DELETE FROM hotFlies WHERE hotFliesId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/hotflies/:reportId', function (req, res) {
  connection.query(`DELETE FROM hotFlies WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> end endpoints

const connection = mysql.createConnection(dbCred);
connection.connect();

module.exports = router
