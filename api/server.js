require('dotenv').config();
const express = require('express');

const configureMiddleware = require('../config/middleware');
const configureRoutes = require('../config/routes');

const server = express();

configureMiddleware(server);
configureRoutes(server);

server.get('/', (req, res) => {
    res.json('It\'s Alive')
})


module.exports = server;
