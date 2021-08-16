import express from 'express';
import exphbs from "express-handlebars";
import path from 'path';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';
import cors from 'cors';

require('./database');

//Initilizations
const app = express();

// --------------------------------------------------------------------------
//Settings
// --------------------------------------------------------------------------


app.use((req, res, next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS");
    
    next();
});

app.use(cors({origin: 'http://localhost:4200'}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// --------------------------------------------------------------------------
//Routes
// --------------------------------------------------------------------------

app.use('/api', require('./routes/perro'));
app.use('/api', require('./routes/adoptante'));
app.use('/api', require('./routes/fundacion'));
app.use('/api', require('./routes/gato'));
app.use('/api', require('./routes/login'));

//module.exports = app;
export default app;