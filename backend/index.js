require("dotenv").config();

const express  = require('express');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT


app.get('/debug', async (req, res) => {
    res.send("ok")
});




app.listen(port, () => {
    console.log(`app running on port: ${port}`)
})