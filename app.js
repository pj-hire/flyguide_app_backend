'use strict'

const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
let dbCred
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  // dbCred = require('./private/db_credentials')
} else {
  dbCred = 'process.env.prodCredentials'
}

const connection = mysql.createConnection(dbCred);

connection.connect();

app.use(cors());

app.use(bodyParser.json());



//---> ROUTING

const tripsRoute = require('./routes/trips.js')
app.use(tripsRoute)

const reportsRoute = require('./routes/reports.js');
app.use(reportsRoute)

const clientsRoute = require('./routes/clients.js');
app.use(clientsRoute)

const spotsRoute = require('./routes/spots.js');
app.use(spotsRoute)

const hotfliesRoute = require('./routes/hotflies.js');
app.use(hotfliesRoute)

const flyboxRoute = require('./routes/flybox.js');
app.use(flyboxRoute)

const targetSpeciesRoute = require('./routes/target-species.js');
app.use(targetSpeciesRoute)

const fishCaughtRoute = require('./routes/fish-caught.js');
app.use(fishCaughtRoute)

//--->PORT

const PORT = process.env.PORT || 3000

app.listen(PORT);
