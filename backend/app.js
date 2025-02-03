const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();
const { readdirSync } = require('fs');
const path = require('path');

const app = express();

//ConnectDB
connectDB();

//middleware
app.use(bodyParser.json({limit: '20mb'}));
app.use(cors());
app.use(morgan('dev'));


app.get('/',function(req,res,next){
    res.json({msg: 'Hello World'});
});

// Routes
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).map((r)=> app.use(require(path.join(routesPath, r))));

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Listening on port: '+port);
})