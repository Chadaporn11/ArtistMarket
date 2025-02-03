const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
require('dotenv').config();
const { readdirSync } = require('fs');

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
// readdirSync('./routes').map((r)=> app.use(require('./routes/'+r)));

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log('Listening on port: '+port);
})