const mySecret = process.env['DB_PASS']
const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const testimonials = require('./routes/testimonials.routes.js');
const concerts = require('./routes/concerts.routes.js');
const seats = require('./routes/seats.routes.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const NODE_ENV = process.env.NODE_ENV;
if (NODE_ENV === "production")
  dbURI = `mongodb+srv://piotrkamecki8:${process.env.DB_PASS}@cluster0.0jrn2po.mongodb.net/NewWaveDB?retryWrites=true&w=majority`;
else if (NODE_ENV === "test") dbURI = "mongodb://localhost:27017/NewWaveDBtest";
else dbURI = "mongodb://localhost:27017/NewWaveDB";

 if (NODE_ENV === "test") dbURI = "mongodb://localhost:27017/NewWaveDBtest";
 else if (NODE_ENV === "development") dbURI = "mongodb://localhost:27017/NewWaveDB";
 else dbURI = `mongodb+srv://piotrkamecki8:${process.env.DB_PASS}@cluster0.0jrn2po.mongodb.net/NewWaveDB?retryWrites=true&w=majority`

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on("connection", (socket) => {
  console.log('New socket!');
});

module.exports = server;