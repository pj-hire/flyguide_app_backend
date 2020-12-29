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

app.get('/aaidtrip', (req, res) => {
  connection.query(`SELECT Auto_increment FROM information_schema.tables WHERE table_name='trips'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> Reports

app.get('/aaidreport', (req, res) => {
  connection.query(`SELECT reportId FROM reports ORDER BY reportId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//shouldnt uid be reportid here??
// app.get('/reports/:uid', (req, res) => {
//   connection.query(`SELECT * FROM reports WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
//     if (err) throw err;
//       res.send(results);
//   })
// })

app.get('/reports/:reportid', (req, res) => {
  connection.query(`SELECT * FROM reports WHERE uid = '${req.params.reportid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/savereport', (req, res) => {
  connection.query(`INSERT INTO reports (reportId, tripId, uid, spotId, notes) VALUES ('${req.body.reportId}', '${req.body.tripId}', '${req.body.uid}', '${req.body.spotId}', '${req.body.notes}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.put('/savereportchanges', function (req, res) {
  connection.query(`UPDATE reports SET notes = '${req.body.notes}', spotId = '${req.body.spotId}' WHERE reportId = '${req.body.reportId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/deletereport', function (req, res) {
  connection.query(`DELETE FROM reports WHERE reportId = ${req.body.reportId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})
//---> Clients

app.get('/clients/:tripid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE tripId = '${req.params.tripid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addclient', (req, res) => {
  connection.query(`INSERT INTO clients (uid, tripId, clientFirstName, clientLastName, clientEmail, clientPhone, clientNotes) VALUES ('${req.body.uid}', '${req.body.tripId}', '${req.body.firstName}', '${req.body.lastName}', '${req.body.email}', '${req.body.phone}', "${req.body.notes}")`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.put('/editclient', function (req, res) {
  connection.query(`UPDATE clients SET clientFirstName = '${req.body.clientFirstName}', clientLastName = '${req.body.clientLastName}', clientEmail = '${req.body.clientEmail}', clientPhone = '${req.body.clientPhone}', clientNotes = '${req.body.clientNotes}' WHERE clientId = '${req.body.clientId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/deleteclient', function (req, res) {
  connection.query(`DELETE FROM clients WHERE clientId = ${req.body.clientId}`, (err, results, fields) => {
    if (err) throw err;
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
  connection.query(`DELETE FROM mySpots WHERE spotId = ${req.body.spotId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> Hot Flies

app.get('/hotflies/:reportid', (req, res) => {
  connection.query(`SELECT * FROM hotFlies WHERE reportId = '${req.params.reportid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addhotfly', (req, res) => {
  connection.query(`INSERT INTO hotFlies (uid, reportId, size, pattern, color) VALUES('${req.body.uid}', '${req.body.reportId}', '${req.body.size}', '${req.body.pattern}', '${req.body.color}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.post('/deletehotfly', function (req, res) {
  connection.query(`DELETE FROM hotFlies WHERE hotFliesId = ${req.body.hotFliesId}`, (err, results, fields) => {
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
  connection.query(`INSERT INTO flybox (uid, flyPattern, flyType) VALUES('${req.body.uid}', "${req.body.flyPattern}", '${req.body.flyType}')`, function (error, results, fields) {
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

//---> Target species

app.get('/targetspecies/:uid', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addspecies', (req, res) => {
  connection.query(`INSERT INTO targetSpecies (uid, speciesName, habitat) VALUES('${req.body.uid}', "${req.body.speciesName}", '${req.body.habitat}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.get('/targetspecies/editspecies/:id', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE fishSpeciesId = '${req.params.id}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.put('/editspecies', function (req, res) {
  connection.query(`UPDATE targetSpecies SET speciesName = '${req.body.speciesName}', habitat = '${req.body.habitat}' WHERE fishSpeciesId = '${req.body.fishSpeciesId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/deletespecies', function (req, res) {
  connection.query(`DELETE FROM targetSpecies WHERE fishSpeciesId = ${req.body.fishSpeciesId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> Fish Species

app.get('/fishspecies/:uid', (req, res) => {
  connection.query(`SELECT * FROM fishSpecies WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> fish Caught

app.get('/fishcaught/:reportid', (req, res) => {
  connection.query(`SELECT * FROM fishCaught WHERE reportId = '${req.params.reportid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/addfishcaught', (req, res) => {
  connection.query(`INSERT INTO fishCaught (uid, reportId, fishSpeciesId, speciesName, qtyCaught) VALUES('${req.body.uid}', '${req.body.reportId}', '${req.body.fishSpeciesId}', '${req.body.speciesName}', '${req.body.qtyCaught}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.post('/deletefishcaught', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE fishCaughtId = ${req.body.fishCaughtId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> trip

app.post('/savetrip', (req, res) => {
  connection.query(`INSERT INTO trips (uid, date, guideOrPersonalTrip, guideTripType, guideTripNumberInParty, tripNotes) VALUES('${req.body.uid}', '${req.body.date}', '${req.body.tripType}', '${req.body.guideTripType}', '${req.body.numberInParty}', '${req.body.tripNotes}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//---> end endpoints

app.listen(3000);
