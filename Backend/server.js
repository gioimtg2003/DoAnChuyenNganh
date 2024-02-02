require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const { PORT } = require("./src/Configs/sys.config");

// config server
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api");

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})
