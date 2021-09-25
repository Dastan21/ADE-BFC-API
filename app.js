const express = require('express');
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Enable CORS
app.use((_, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

const indexRouter = require('./routes');
app.use('/', indexRouter);
app.use((_req, res) => {
	res.status(404).send({ status: "error", message: "API not found" });
});

module.exports = app;