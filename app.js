const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const enforce = require('express-sslify');
const admin = require('firebase-admin');

// Create express app
const app = express();

// Set up development environment
if (process.env.NODE_ENV !== 'production') {
	console.log('Running in development mode');
	require('dotenv').config();
	app.use(require('morgan')('dev'));
} else {
	console.log('Running in production mode');
	app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// Set up Firebase
const serviceAccount = require('./service-account-key.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://gotcha-67060.firebaseio.com'
});

// Define routers
const indexRouter = require('./routes/index');

// Set up app
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// Set up routers
app.use('/', indexRouter);

module.exports = app;
