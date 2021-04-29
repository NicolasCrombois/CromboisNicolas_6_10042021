const host = 'http://localhost:3000/';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const helmet = require('helmet');
const cookieSession = require('cookie-session');
const passwordValidator = require('password-validator');

const userRoute = require('./routes/user');
const sauceRoute = require('./routes/sauce');

var expiryDate = new Date(Date.now() + 60 * 60 * 1000)

mongoose.connect('mongodb+srv://CromboisDev:hT2TmW6SQ6k8ZGd2@cluster-eu.t8nsf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use(cookieSession({
  name: 'session',
  keys: ["Les meilleurs idées de sauces piquantes", "Tabasco", "Moutarde de Dijon", "Sriracha"],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: host,
    expires: expiryDate
  }
}))

app.use('/api/auth', userRoute);
app.use('/api/sauces', sauceRoute);


module.exports = app;