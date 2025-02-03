const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require('dotenv').config();
const { readdirSync } = require('fs');
const connectDB = require('./config/db');

const app = express();

//ConnectDB
connectDB();

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '20mb'}));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Welcom to ArtistMarket!!!')
});

// Routes
readdirSync('./routes').map((r)=> app.use(require('./routes/'+r)));

const port = process.env.PORT
app.listen(port,() => {
    console.log('Server is running on port '+port);

});