const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//require('dotenv').config();

const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const app = express();

mongoose
  .connect(
    'mongodb+srv://shyam:' +
      process.env.MONGO_ATLAS_PW +
      '@cluster0-f08rl.mongodb.net/meanpost',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to mongoDB Atlas');
  })
  .catch(() => {
    console.log("Couldn't connect to Atlas");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, './angular')));
app.use('/images', express.static(path.join('./images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use('/api/posts/', postRoutes);
app.use('/api/auth/', authRoutes);
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'angular', 'index.html'));
});

module.exports = app;
