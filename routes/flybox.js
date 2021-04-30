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

router.get('/flybox/:uid', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/flybox/editfly/:id', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE flyId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

router.post('/flybox', (req, res) => {
  connection.query(`INSERT INTO flybox (uid, flyPattern, flyType) VALUES(?, ?, ?)`,[
    req.body.uid,
    req.body.flyPattern,
    req.body.flyType
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.put('/flybox', function (req, res) {
  connection.query(`UPDATE flybox SET flyPattern = ?, flyType = ? WHERE flyId = ?`,[
    req.body.flyPattern,
    req.body.flyType,
    req.body.flyId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/flybox/:id', function (req, res) {
  connection.query(`DELETE FROM flybox WHERE flyId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> end endpoints

const connection = mysql.createConnection(dbCred);
connection.connect();

module.exports = router
