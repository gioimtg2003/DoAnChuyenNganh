require('dotenv').config();
const express = require('express');
const httpServer = require('http');
const { initApp } = require('./src/app');
const { PORT } = require("./src/Configs/sys.config");
const { initSocket } = require('./src/socket');

const server = httpServer.createServer(initApp(express()));
initSocket(server);

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})