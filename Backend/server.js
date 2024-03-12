require('dotenv').config();
const express = require('express');
const httpServer = require('http');
const { initApp } = require('./src/app');
const { PORT } = require("./src/Configs/sys.config");

const server = httpServer.createServer(initApp(express()));

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})