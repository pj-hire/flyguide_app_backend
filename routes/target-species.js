const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const dbCred = require('../private/db_credentials')

//---> start endpoints

router.get('/targetspecies/:uid', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.get('/targetspecies/editspecies/:id', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE fishSpeciesId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

router.post('/targetspecies', (req, res) => {
  connection.query(`INSERT INTO targetSpecies (uid, speciesName, habitat) VALUES(?, ?, ?)`,[
    req.body.uid,
    req.body.speciesName,
    req.body.habitat
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

router.put('/targetspecies', function (req, res) {
  connection.query(`UPDATE targetSpecies SET speciesName = ?, habitat = ? WHERE fishSpeciesId = ?`,[
    req.body.speciesName,
    req.body.habitat,
    req.body.fishSpeciesId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

router.delete('/targetspecies/:id', function (req, res) {
  connection.query(`DELETE FROM targetSpecies WHERE fishSpeciesId = ?`,[
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
