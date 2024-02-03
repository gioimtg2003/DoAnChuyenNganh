require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { PORT } = require("./src/Configs/sys.config");
const morgan = require('morgan');
const { route } = require('./src/Routes');

// config server
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", route);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
