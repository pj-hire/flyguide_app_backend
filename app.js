'use strict'

const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbCred = require('./private/db_credentials')

var connection = mysql.createConnection(dbCred);

connection.connect();

const app = express();

app.use(cors());

app.use(bodyParser.json());

//---> start endpoints

//---> TRIPS

//get last tripId from trips (will add one to results on frontend)
app.get('/aaidtrip', (req, res) => {
  connection.query(`SELECT tripId FROM trips ORDER BY tripId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

// get all trips with users Firebase Auth uid
app.get('/trips-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM trips WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//viewtrip - select all trips where tripId matches route
app.get('/trips/:tripid', (req, res) => {
  connection.query(`SELECT * FROM trips where tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/trips', (req, res) => {
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

//delete all trips that match tripId
app.delete('/trips/:tripId', function (req, res) {
  connection.query(`DELETE FROM trips WHERE tripId = ?`,[
    req.params.tripId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
    })
  })

//---> REPORTS

app.get('/aaidreport', (req, res) => {
  connection.query(`SELECT reportId FROM reports ORDER BY reportId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//--> select all reports from single trip based on tripId
app.get('/reports/:tripid', (req, res) => {
  connection.query(`SELECT * FROM reports WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/reports', (req, res) => {
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

app.put('/reports', function (req, res) {
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
app.delete('/reports/:reportId', function (req, res) {
  connection.query(`DELETE FROM reports WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete all reports associated with a tripId
app.delete('/reports-trip/:tripId', function (req, res) {
  connection.query(`DELETE FROM reports WHERE tripId = ?`,[
    req.params.tripId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> CLIENTS

//mytrips - get all clients with specified google auth uid
app.get('/clients-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//Viewtrip.vue - get all clients based on trip id
app.get('/clients/:tripid', (req, res) => {
  connection.query(`SELECT * FROM clients WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/clients', (req, res) => {
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

app.put('/clients', function (req, res) {
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

// delete all clients with a specified client id
app.delete('/clients/:id', function (req, res) {
  connection.query(`DELETE FROM clients WHERE clientId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete all clients with specified tripid
app.delete('/clients-trip/:tripid', function (req, res) {
  connection.query(`DELETE FROM clients WHERE tripId = ?`,[
    req.params.tripid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> SPOTS

app.get('/spots-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/spots/:spotid', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE spotId = ?`,[
    req.params.spotid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/spots/editspot/:id', (req, res) => {
  connection.query(`SELECT * FROM mySpots WHERE spotId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.post('/spots', (req, res) => {
  connection.query(`INSERT INTO mySpots (uid, locationName, subLocationName) VALUES(?, ?, ?)`,[
    req.body.uid,
    req.body.locationName,
    req.body.subLocationName
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.put('/spots', function (req, res) {
  connection.query(`UPDATE mySpots SET locationName = ?, subLocationName = ? WHERE spotId = ?`,[
    req.body.locationName,
    req.body.subLocationName,
    req.body.spotId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.delete('/spots/:spotId', function (req, res) {
  connection.query(`DELETE FROM mySpots WHERE spotId = ?`,[
    req.params.spotId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> HOT FLIES

app.get('/hotflies-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM hotFlies WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/hotflies/:reportid', (req, res) => {
  connection.query(`SELECT * FROM hotFlies WHERE reportId = ?`,[
    req.params.reportid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/hotflies', (req, res) => {
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

app.delete('/hotflies-fly/:id', function (req, res) {
  connection.query(`DELETE FROM hotFlies WHERE hotFliesId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete hotflies associated with deleted report
app.delete('/hotflies/:reportId', function (req, res) {
  connection.query(`DELETE FROM hotFlies WHERE reportId = ?`,[
    req.params.reportId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> FLYBOX

app.get('/flybox/:uid', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE uid = ?`,[
    req.params.uid
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/flybox/editfly/:id', (req, res) => {
  connection.query(`SELECT * FROM flybox WHERE flyId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.post('/flybox', (req, res) => {
  connection.query(`INSERT INTO flybox (uid, flyPattern, flyType) VALUES(?, ?, ?)`,[
    req.body.uid,
    req.body.flyPattern,
    req.body.flyType
  ], function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.put('/flybox', function (req, res) {
  connection.query(`UPDATE flybox SET flyPattern = ?, flyType = ? WHERE flyId = ?`,[
    req.body.flyPattern,
    req.body.flyType,
    req.body.flyId
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.delete('/flybox/:id', function (req, res) {
  connection.query(`DELETE FROM flybox WHERE flyId = ?`,[
    req.params.id
  ], (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> TARGET SPECIES

app.get('/targetspecies/:uid', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/targetspecies/editspecies/:id', (req, res) => {
  connection.query(`SELECT * FROM targetSpecies WHERE fishSpeciesId = '${req.params.id}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results[0]);
  })
})

app.post('/targetspecies', (req, res) => {
  connection.query(`INSERT INTO targetSpecies (uid, speciesName, habitat) VALUES('${req.body.uid}', "${req.body.speciesName}", '${req.body.habitat}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

app.put('/targetspecies', function (req, res) {
  connection.query(`UPDATE targetSpecies SET speciesName = '${req.body.speciesName}', habitat = '${req.body.habitat}' WHERE fishSpeciesId = '${req.body.fishSpeciesId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.delete('/targetspecies/:id', function (req, res) {
  connection.query(`DELETE FROM targetSpecies WHERE fishSpeciesId = ${req.params.id}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> FISH CAUGHT

app.get('/fishcaught-uid/:uid', (req, res) => {
  connection.query(`SELECT * FROM fishCaught WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.get('/fishcaught/:reportid', (req, res) => {
  connection.query(`SELECT * FROM fishCaught WHERE reportId = '${req.params.reportid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/fishcaught', (req, res) => {
  connection.query(`INSERT INTO fishCaught (uid, reportId, fishSpeciesId, speciesName, qtyCaught) VALUES('${req.body.uid}', '${req.body.reportId}', '${req.body.fishSpeciesId}', '${req.body.speciesName}', '${req.body.qtyCaught}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//delete fishcaught associated with deleted report
app.delete('/fishcaught/:reportId', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE reportId = ${req.params.reportId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete fishcaught associated with fishcaught id
app.delete('/fishcaught-id/:id', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE fishCaughtId = '${req.params.id}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete fishcaught associated with all reports associated with trip
app.delete('/fishcaught-trip/:reportId', function (req, res) {
  connection.query(`DELETE FROM fishCaught WHERE reportId = '${req.params.reportId}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//---> FISH CAUGHT QUANTITY

app.post('/fishcaughtqty', (req, res) => {
  connection.query(`UPDATE fishCaught SET qtyCaught = '${req.body.qtyCaught}' WHERE fishCaughtId = '${req.body.fishCaughtId}'`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//---> end endpoints

const PORT = process.env.PORT || 3000

app.listen(PORT);
