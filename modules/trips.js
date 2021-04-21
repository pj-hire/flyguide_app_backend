// trips.exports = true;


// get all trips with users Firebase Auth uid
app.get('/trips/:uid', (req, res) => {
  connection.query(`SELECT * FROM trips WHERE uid = '${req.params.uid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//set tripId to last trips Id + 1
app.get('/aaidtrip', (req, res) => {
  connection.query(`SELECT tripId FROM trips ORDER BY tripId DESC LIMIT 1`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

app.post('/trips', (req, res) => {
  connection.query(`INSERT INTO trips (uid, date, guideOrPersonalTrip, guideTripType, guideTripNumberInParty, tripNotes) VALUES('${req.body.uid}', '${req.body.date}', '${req.body.tripType}', '${req.body.guideTripType}', '${req.body.numberInParty}', '${req.body.tripNotes}')`, function (error, results, fields) {
    if (error) throw error;
      res.send(results);
  })
})

//viewtrip - select all trips where tripId matches route
app.get('/trips-trip/:tripid', (req, res) => {
  connection.query(`SELECT * FROM trips where tripId = '${req.params.tripid}'`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
  })
})

//delete all trips that match tripId
app.delete('/trips/:tripId', function (req, res) {
  connection.query(`DELETE FROM trips WHERE tripId = ${req.params.tripId}`, (err, results, fields) => {
    if (err) throw err;
      res.send(results);
    })
  })
