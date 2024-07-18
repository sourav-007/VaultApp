const express = require('express');
const dotenv = require("dotenv").config();
const app = express();

const uploadRoute = require('./routes/fileroutes.js');
 


app.get('/', (req, res) => {
    res.send("This is home page");
});

app.use('/home',uploadRoute);


app.listen(5001, () => {
    console.log("Server is running on port");
});